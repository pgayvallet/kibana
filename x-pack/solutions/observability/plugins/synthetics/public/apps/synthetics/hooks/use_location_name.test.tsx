/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useLocationName } from './use_location_name';
import { WrappedHelper } from '../utils/testing';
import { OverviewStatusMetaData } from '../../../../common/runtime_types';

describe('useLocationName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns expected label', () => {
    const WrapperWithState = ({ children }: React.PropsWithChildren) => {
      return (
        <WrappedHelper
          state={{
            serviceLocations: {
              locationsLoaded: true,
              loading: false,
              locations: [
                {
                  url: 'mockUrl',
                  id: 'us_central',
                  label: 'US Central',
                  isServiceManaged: true,
                },
                {
                  url: 'mockUrl',
                  id: 'us_east',
                  label: 'US East',
                  isServiceManaged: true,
                },
              ],
            },
          }}
        >
          {React.createElement(React.Fragment, null, children)}
        </WrappedHelper>
      );
    };

    const { result } = renderHook(
      () =>
        useLocationName({
          locationId: 'us_central',
        } as OverviewStatusMetaData),
      { wrapper: WrapperWithState }
    );
    expect(result.current).toEqual('US Central');
  });

  it('returns the location id if matching location cannot be found', () => {
    const WrapperWithState = ({ children }: React.PropsWithChildren) => {
      return (
        <WrappedHelper
          state={{
            serviceLocations: {
              locationsLoaded: true,
              loading: false,
              locations: [
                {
                  url: 'mockUrl',
                  id: 'us_central',
                  label: 'US Central',
                  isServiceManaged: true,
                },
                {
                  url: 'mockUrl',
                  id: 'us_east',
                  label: 'US East',
                  isServiceManaged: true,
                },
              ],
            },
          }}
        >
          {React.createElement(React.Fragment, null, children)}
        </WrappedHelper>
      );
    };

    const { result } = renderHook(
      () =>
        useLocationName({
          locationId: 'us_central_qa',
        } as OverviewStatusMetaData),
      { wrapper: WrapperWithState }
    );
    expect(result.current).toEqual('us_central_qa');
  });
});
