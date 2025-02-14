/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IRouter } from '@kbn/core/server';
import { SecurityPluginSetup } from '@kbn/security-plugin/server';
import { FeaturesPluginSetup } from '@kbn/features-plugin/server';
import { handleEsError } from './shared_imports';

export interface Dependencies {
  security: SecurityPluginSetup;
  features: FeaturesPluginSetup;
}

export interface RouteDependencies {
  router: IRouter;
  config: {
    isSecurityEnabled: () => boolean;
    enableManageProcessors: boolean;
  };
  lib: {
    handleEsError: typeof handleEsError;
  };
}
