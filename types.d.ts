import { RequestHandler } from 'express';

// Interface for individual metric types (consider specific number or unit types)
export type Metric = {
  name: string;
  time: number[];
  value: number[]; // Flexible for various metric types
};

// Interface for the entire state
export type MetricsData = {
  name: string;
  driverVersion: number;
  metrics: Metric[];
};

export type MetricsState = {
  status: 'loading' | 'failed' | 'finished';
  error: { status: number; data: any } | null;
  data: MetricsData | null;
};

// export interface CpuUsageData {
// export type apiController = {
//   cpuUsage: RequestHandler():void
// };

export interface CpuUsageapiData {
  podName: string;
  metric: string;
  time: string[];
  value: (string | number)[];
  Date: string;
}
