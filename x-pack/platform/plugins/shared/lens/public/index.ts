/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { LensPlugin } from './plugin';

export { isLensApi } from './react_embeddable/type_guards';
export { type EmbeddableComponent } from './react_embeddable/renderer/lens_custom_renderer_component';
export type {
  LensApi,
  LensSerializedState,
  LensRuntimeState,
  LensByValueInput,
  LensByReferenceInput,
  TypedLensByValueInput,
  LensEmbeddableInput,
  LensEmbeddableOutput,
  LensSavedObjectAttributes,
  LensRendererProps as EmbeddableComponentProps,
} from './react_embeddable/types';

export type {
  XYState,
  XYReferenceLineLayerConfig,
  XYLayerConfig,
  ValidLayer,
  XYDataLayerConfig,
  XYAnnotationLayerConfig,
  YAxisMode,
  SeriesType,
  YConfig,
} from './visualizations/xy/types';
export type {
  DatasourcePublicAPI,
  DataType,
  OperationMetadata,
  SuggestionRequest,
  TableSuggestion,
  Visualization,
  VisualizationSuggestion,
  Suggestion,
  UserMessage,
} from './types';
export type {
  LegacyMetricState as MetricState,
  ValueLabelConfig,
  PieVisualizationState,
  PieLayerState,
  SharedPieLayerState,
  LayerType,
} from '../common/types';

export type { DatatableVisualizationState } from './visualizations/datatable/visualization';
export type { HeatmapVisualizationState } from './visualizations/heatmap/types';
export type { GaugeVisualizationState } from './visualizations/gauge/constants';
export type { MetricVisualizationState } from './visualizations/metric/types';
export type { TagcloudState } from './visualizations/tagcloud/types';
export type {
  FormBasedPersistedState,
  PersistedIndexPatternLayer,
  OperationType,
  IncompleteColumn,
  GenericIndexPatternColumn,
  FieldBasedIndexPatternColumn,
  FiltersIndexPatternColumn,
  RangeIndexPatternColumn,
  TermsIndexPatternColumn,
  DateHistogramIndexPatternColumn,
  MinIndexPatternColumn,
  MaxIndexPatternColumn,
  AvgIndexPatternColumn,
  CardinalityIndexPatternColumn,
  SumIndexPatternColumn,
  MedianIndexPatternColumn,
  StandardDeviationIndexPatternColumn,
  PercentileIndexPatternColumn,
  PercentileRanksIndexPatternColumn,
  CountIndexPatternColumn,
  LastValueIndexPatternColumn,
  CumulativeSumIndexPatternColumn,
  CounterRateIndexPatternColumn,
  DerivativeIndexPatternColumn,
  MovingAverageIndexPatternColumn,
  FormulaIndexPatternColumn,
  MathIndexPatternColumn,
  OverallSumIndexPatternColumn,
  FormulaPublicApi,
  StaticValueIndexPatternColumn,
  TimeScaleIndexPatternColumn,
  FormBasedLayer,
} from './datasources/form_based/types';
export type { TextBasedPersistedState } from './datasources/form_based/esql_layer/types';
export type {
  XYArgs,
  XYRender,
  LineStyle,
  FillStyle,
  YScaleType,
  XScaleType,
  AxisConfig,
  XYCurveType,
  XYChartProps,
  LegendConfig,
  IconPosition,
  DataLayerArgs,
  ValueLabelMode,
  AxisExtentMode,
  DataLayerConfig,
  FittingFunction,
  AxisExtentConfig,
  LegendConfigResult,
  AxesSettingsConfig,
  AxisExtentConfigResult,
  ReferenceLineLayerArgs,
  ReferenceLineLayerConfig,
} from '@kbn/expression-xy-plugin/common';

export type { InlineEditLensEmbeddableContext } from './trigger_actions/open_lens_config/in_app_embeddable_edit/types';

export type { ChartInfo } from './chart_info_api';

export { layerTypes } from '../common/layer_types';
export { LENS_EMBEDDABLE_TYPE } from '../common/constants';

export type { LensPublicStart, LensPublicSetup, LensSuggestionsApi } from './plugin';

export const plugin = () => new LensPlugin();
