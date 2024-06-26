/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallowWithIntl } from '@kbn/test/jest';

import { Introduction } from './introduction';

test('render', () => {
  const component = shallowWithIntl(
    <Introduction.WrappedComponent
      description="this is a great tutorial about..."
      title="Great tutorial"
    />
  );
  expect(component).toMatchSnapshot(); // eslint-disable-line
});

describe('props', () => {
  test('iconType', () => {
    const component = shallowWithIntl(
      <Introduction.WrappedComponent
        description="this is a great tutorial about..."
        title="Great tutorial"
        iconType="logoElastic"
      />
    );
    expect(component).toMatchSnapshot(); // eslint-disable-line
  });

  test('exportedFieldsUrl', () => {
    const component = shallowWithIntl(
      <Introduction.WrappedComponent
        description="this is a great tutorial about..."
        title="Great tutorial"
        exportedFieldsUrl="exported_fields_url"
      />
    );
    expect(component).toMatchSnapshot(); // eslint-disable-line
  });

  test('previewUrl', () => {
    const component = shallowWithIntl(
      <Introduction.WrappedComponent
        description="this is a great tutorial about..."
        title="Great tutorial"
        previewUrl="preview_image_url"
      />
    );
    expect(component).toMatchSnapshot(); // eslint-disable-line
  });

  test('isBeta', () => {
    const component = shallowWithIntl(
      <Introduction.WrappedComponent
        description="this is a great tutorial about..."
        title="Great tutorial"
        isBeta={true}
      />
    );
    expect(component).toMatchSnapshot(); // eslint-disable-line
  });
});
