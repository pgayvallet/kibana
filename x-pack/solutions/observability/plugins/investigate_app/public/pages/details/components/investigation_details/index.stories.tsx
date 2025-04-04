/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { mockAuthenticatedUser } from '@kbn/core-security-common/mocks';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { KibanaReactStorybookDecorator } from '../../../../../.storybook/storybook_decorator';
import { InvestigationDetails as Component } from './investigation_details';

const meta: Meta<typeof Component> = {
  component: Component,
  title: 'app/Organisms/InvestigatationDetails',
  decorators: [KibanaReactStorybookDecorator],
};

export default meta;

const defaultProps: StoryObj<typeof Component> = {
  args: {},
  render: (props) => <Component user={mockAuthenticatedUser()} />,
};

export const InvestigateViewStory: StoryObj<typeof Component> = {
  ...defaultProps,
  name: 'default',
};
