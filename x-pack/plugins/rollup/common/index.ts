/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { LicenseType } from '../../licensing/common/types';

const basicLicense: LicenseType = 'basic';

export const PLUGIN = {
  ID: 'rollup',
  minimumLicenseType: basicLicense,
};

export const MAJOR_VERSION = '8.0.0';

export const CONFIG_ROLLUPS = 'rollups:enableIndexPatterns';

export const API_BASE_PATH = '/api/rollup';

export {
  UIM_APP_NAME,
  UIM_APP_LOAD,
  UIM_JOB_CREATE,
  UIM_JOB_DELETE,
  UIM_JOB_DELETE_MANY,
  UIM_JOB_START,
  UIM_JOB_START_MANY,
  UIM_JOB_STOP,
  UIM_JOB_STOP_MANY,
  UIM_SHOW_DETAILS_CLICK,
  UIM_DETAIL_PANEL_SUMMARY_TAB_CLICK,
  UIM_DETAIL_PANEL_TERMS_TAB_CLICK,
  UIM_DETAIL_PANEL_HISTOGRAM_TAB_CLICK,
  UIM_DETAIL_PANEL_METRICS_TAB_CLICK,
  UIM_DETAIL_PANEL_JSON_TAB_CLICK,
} from './ui_metric';
