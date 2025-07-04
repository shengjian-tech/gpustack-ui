import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
  PieSeriesOption
} from 'echarts/charts';
import { BarChart, GaugeChart, LineChart, ScatterChart,PieChart } from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components';
import {
  DataZoomComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  // (filter, sort)
  TransformComponent
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | GaugeSeriesOption
  | ScatterSeriesOption
  | PieSeriesOption
>;

// register components and charts
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  ScatterChart,
  GaugeChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export type { ECOption };

export default echarts;
