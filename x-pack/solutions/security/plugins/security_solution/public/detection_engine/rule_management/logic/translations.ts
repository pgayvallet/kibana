/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

export const RULE_AND_TIMELINE_FETCH_FAILURE = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.rulesAndTimelines',
  {
    defaultMessage: 'Failed to fetch Rules and Timelines',
  }
);

export const RULE_MANAGEMENT_FILTERS_FETCH_FAILURE = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.ruleManagementFiltersFetchFailure',
  {
    defaultMessage: 'Failed to fetch rule filters',
  }
);

export const RULE_ADD_FAILURE = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.addRuleFailDescription',
  {
    defaultMessage: 'Failed to add Rule',
  }
);

export const RULE_AND_TIMELINE_PREPACKAGED_FAILURE = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.createPrePackagedRuleAndTimelineFailDescription',
  {
    defaultMessage: 'Failed to installed pre-packaged rules and timelines from elastic',
  }
);

export const RULE_AND_TIMELINE_PREPACKAGED_SUCCESS = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.createPrePackagedRuleAndTimelineSuccesDescription',
  {
    defaultMessage: 'Installed pre-packaged rules and timeline templates from elastic',
  }
);

export const RULE_PREPACKAGED_SUCCESS = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.createPrePackagedRuleSuccesDescription',
  {
    defaultMessage: 'Installed pre-packaged rules from elastic',
  }
);

export const TIMELINE_PREPACKAGED_SUCCESS = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.createPrePackagedTimelineSuccesDescription',
  {
    defaultMessage: 'Installed pre-packaged timeline templates from elastic',
  }
);

export const BOOTSTRAP_PREBUILT_RULES_FAILURE = i18n.translate(
  'xpack.securitySolution.containers.detectionEngine.bootstrapPrebuiltRulesFailure',
  {
    defaultMessage: 'Failed to bootstrap prebuilt rules',
  }
);
