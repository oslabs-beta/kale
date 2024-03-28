export type Metric = {
  name: string;
  time: number[];
  value: number[];
};

export type MetricsState = {
  status: 'loading' | 'failed' | 'finished';
  error: { status: number; data: any } | null;
  data: MetricsData | null;
};

export type ErrorMessage = {
  err: string;
};
export type ServerError = {
  log: string;
  status: number;
  message: ErrorMessage;
};

export type FetchResponseData = {
  status: string;
  data: {
    result: Array<{
      values: Array<[number, string | number]>;
    }>;
  };
};

export type MetricsData = {
  metric: string;
  time: string[];
  value: number[];
};

// res.locals.metrics
export interface ApiData {
  podName: string;
  date: string;
  metrics: { [key: string]: MetricsData };
}


