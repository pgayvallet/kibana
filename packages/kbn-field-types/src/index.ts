/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export { KbnFieldType } from './kbn_field_type';

export {
  castEsToKbnFieldTypeName,
  getKbnFieldType,
  getKbnTypeNames,
  getFilterableKbnTypeNames,
} from './kbn_field_types';

export { KBN_FIELD_TYPES, ES_FIELD_TYPES, KbnFieldTypeOptions } from './types';
