/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { waitFor, renderHook } from '@testing-library/react';

import { coreMock } from '@kbn/core/public/mocks';

import * as api from '../api/api';
import { getRulesSchemaMock } from '../../../../common/api/detection_engine/model/rule_schema/mocks';
import { useDisassociateExceptionList } from './use_disassociate_exception_list';

const mockKibanaHttpService = coreMock.createStart().http;

describe('useDisassociateExceptionList', () => {
  const onError = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.spyOn(api, 'patchRule').mockResolvedValue(getRulesSchemaMock());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes hook', async () => {
    const { result } = renderHook(() =>
      useDisassociateExceptionList({
        http: mockKibanaHttpService,
        ruleRuleId: 'rule_id',
        onError,
        onSuccess,
      })
    );

    await waitFor(() => expect(result.current).toEqual([false, null]));
  });
});
