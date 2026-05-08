// ─────────────────────────────────────────────────────
// @termuijs/widgets — Public API
// ─────────────────────────────────────────────────────

// ── Base ──────────────────────────────────────────────
export { Widget } from './base/Widget.js';
export type { WidgetEvents } from './base/Widget.js';

// ── Display Widgets ───────────────────────────────────
export { Box } from './display/Box.js';
export { Text } from './display/Text.js';
export type { TextProps } from './display/Text.js';
export { LogView } from './display/LogView.js';
export type { LogViewOptions } from './display/LogView.js';
export { Tree } from './display/Tree.js';
export type { TreeNode, TreeOptions } from './display/Tree.js';
export { JSONView, jsonToTree } from './display/JSONView.js';
export type { JSONViewOptions, JSONNodeData, JSONNodeType } from './display/JSONView.js';

// ── Input Widgets ─────────────────────────────────────
export { List } from './input/List.js';
export type { ListItem } from './input/List.js';
export { TextInput } from './input/TextInput.js';
export { VirtualList } from './input/VirtualList.js';
export type { VirtualListOptions } from './input/VirtualList.js';

// ── Data Widgets ──────────────────────────────────────
export { Table } from './data/Table.js';
export type { TableColumn, TableRow, TableOptions } from './data/Table.js';
export { Gauge } from './data/Gauge.js';
export type { GaugeOptions } from './data/Gauge.js';
export { Sparkline } from './data/Sparkline.js';
export type { SparklineOptions } from './data/Sparkline.js';
export { StatusIndicator } from './data/StatusIndicator.js';
export type { StatusIndicatorOptions } from './data/StatusIndicator.js';
export { BarChart } from './data/BarChart.js';
export type { Bar, BarGroup, BarChartDirection, BarChartOptions } from './data/BarChart.js';

// ── Feedback Widgets ──────────────────────────────────
export { ProgressBar } from './feedback/ProgressBar.js';
export type { ProgressBarOptions } from './feedback/ProgressBar.js';
export { Spinner, SPINNER_FRAMES } from './feedback/Spinner.js';
export type { SpinnerOptions } from './feedback/Spinner.js';
export { Scrollbar } from './feedback/Scrollbar.js';
export type { ScrollbarOrientation, ScrollbarOptions } from './feedback/Scrollbar.js';
