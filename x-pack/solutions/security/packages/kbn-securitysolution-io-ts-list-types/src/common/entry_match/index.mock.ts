/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EntryMatch } from '.';
import { ENTRY_VALUE, FIELD, MATCH, OPERATOR } from '../../constants/index.mock';

export const getEntryMatchMock = (): EntryMatch => ({
  field: FIELD,
  operator: OPERATOR,
  type: MATCH,
  value: ENTRY_VALUE,
});

export const getEntryMatchExcludeMock = (): EntryMatch => ({
  ...getEntryMatchMock(),
  operator: 'excluded',
});
