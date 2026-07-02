/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { CustomCommand } from 'just-bash';
import { defineCommand } from 'just-bash';
import type { ZodObject } from '@kbn/zod/v4';
import type { MaybePromise } from '@kbn/utility-types';

export type ExecToolFn = (toolId: string, args: unknown) => Promise<unknown>;
export type ResolveToolIdFn = (toolId: string) => string;
export type GetToolSchemaFn = (resolvedToolId: string) => MaybePromise<ZodObject<any>>;

interface ParsedParam {
  key: string;
  /** undefined => bare flag (e.g. `--verbose`), resolved against the schema later. */
  value?: string;
}

interface ParsedArgs {
  toolId?: string;
  argsRaw?: string;
  params?: ParsedParam[];
  error?: string;
}

/**
 * Hand-rolled argv parser for `exec_tool`: one positional tool id, an optional
 * `--args=<json>` / `--args <json>` base object, and any number of individual
 * `--key=value` / `--key value` / bare `--flag` params.
 */
const parseArgs = (argv: string[]): ParsedArgs => {
  if (argv.length === 0) {
    return { error: 'exec_tool: missing tool id argument' };
  }
  const [toolId, ...rest] = argv;
  let argsRaw: string | undefined;
  const params: ParsedParam[] = [];

  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];

    if (a.startsWith('--args=')) {
      argsRaw = a.slice('--args='.length);
      continue;
    }
    if (a === '--args') {
      const next = rest[i + 1];
      if (next === undefined || next.startsWith('--')) {
        return { error: "exec_tool: --args requires a value (use --args='<json>')" };
      }
      argsRaw = next;
      i++;
      continue;
    }
    if (a.startsWith('--')) {
      const body = a.slice(2);
      const eq = body.indexOf('=');
      if (eq >= 0) {
        const key = body.slice(0, eq);
        if (key === '') {
          return { error: `exec_tool: invalid flag '${a}'` };
        }
        params.push({ key, value: body.slice(eq + 1) });
        continue;
      }
      if (body === '') {
        return { error: `exec_tool: invalid flag '${a}'` };
      }
      const next = rest[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        params.push({ key: body, value: next });
        i++;
      } else {
        params.push({ key: body, value: undefined });
      }
      continue;
    }

    return { error: `exec_tool: unexpected argument '${a}'` };
  }

  return { toolId, argsRaw, params };
};

/** Unwrap ZodOptional / ZodDefault / ZodNullable to the inner type. */
const unwrapZodType = (type: any): any => {
  let t = type;
  while (t?.def && ['optional', 'default', 'nullable'].includes(t.def.type)) {
    t = t.def.innerType;
  }
  return t;
};

/**
 * Coerce a raw CLI string value to the declared type of `key` in `schema`.
 * Unknown keys fall back to best-effort JSON parsing, then raw string.
 * Throws with a user-facing message on coercion failure.
 */
const coerceParamValue = (
  schema: ZodObject<any>,
  key: string,
  rawValue: string | undefined
): unknown => {
  const field = schema.shape[key];
  const fieldType = field ? unwrapZodType(field) : undefined;
  const kind: string | undefined = fieldType?.def?.type;

  if (rawValue === undefined) {
    if (kind === 'boolean') return true;
    throw new Error(`--${key} requires a value`);
  }

  if (!fieldType) {
    try {
      return JSON.parse(rawValue);
    } catch {
      return rawValue;
    }
  }

  switch (kind) {
    case 'number': {
      const n = Number(rawValue);
      if (Number.isNaN(n)) {
        throw new Error(`--${key} expects a number, got '${rawValue}'`);
      }
      return n;
    }
    case 'boolean': {
      if (rawValue === 'true') return true;
      if (rawValue === 'false') return false;
      throw new Error(`--${key} expects a boolean (true|false), got '${rawValue}'`);
    }
    case 'array':
    case 'object': {
      try {
        return JSON.parse(rawValue);
      } catch {
        throw new Error(`--${key} expects JSON ${kind}, got invalid JSON: '${rawValue}'`);
      }
    }
    default:
      return rawValue;
  }
};

export const createExecToolCommand = ({
  execToolFn,
  resolveToolId,
  getToolSchema,
}: {
  execToolFn: ExecToolFn;
  resolveToolId: ResolveToolIdFn;
  getToolSchema: GetToolSchemaFn;
}): CustomCommand => {
  return defineCommand('exec_tool', async (argv) => {
    const parsed = parseArgs(argv);
    if (parsed.error) {
      return { stdout: '', stderr: `${parsed.error}\n`, exitCode: 1 };
    }
    const { toolId, argsRaw, params } = parsed;
    const resolvedToolId = resolveToolId(toolId!);

    // Parse the optional --args base object.
    let argsValue: unknown;
    if (argsRaw !== undefined) {
      try {
        argsValue = JSON.parse(argsRaw);
      } catch (err) {
        return {
          stdout: '',
          stderr: `exec_tool: invalid JSON for --args: ${(err as Error).message}\n`,
          exitCode: 1,
        };
      }
    }

    const hasParams = params !== undefined && params.length > 0;

    let finalArgs: unknown = argsValue;

    if (hasParams) {
      // --args must be an object when merging individual params into it.
      if (
        argsRaw !== undefined &&
        (typeof argsValue !== 'object' || argsValue === null || Array.isArray(argsValue))
      ) {
        return {
          stdout: '',
          stderr:
            'exec_tool: --args must be a JSON object when combined with individual --params\n',
          exitCode: 1,
        };
      }

      let schema: ZodObject<any>;
      try {
        schema = await getToolSchema(resolvedToolId);
      } catch (err) {
        return {
          stdout: '',
          stderr: `exec_tool: ${(err as Error).message ?? String(err)}\n`,
          exitCode: 1,
        };
      }

      const base = (argsValue as Record<string, unknown>) ?? {};
      const coerced: Record<string, unknown> = {};
      for (const { key, value } of params!) {
        try {
          coerced[key] = coerceParamValue(schema, key, value);
        } catch (err) {
          return {
            stdout: '',
            stderr: `exec_tool: ${(err as Error).message}\n`,
            exitCode: 1,
          };
        }
      }

      finalArgs = { ...base, ...coerced };
    }

    try {
      const result = await execToolFn(resolvedToolId, finalArgs);
      return { stdout: `${JSON.stringify(result)}\n`, stderr: '', exitCode: 0 };
    } catch (err) {
      return {
        stdout: '',
        stderr: `exec_tool: ${(err as Error).message ?? String(err)}\n`,
        exitCode: 1,
      };
    }
  });
};
