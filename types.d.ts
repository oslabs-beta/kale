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

export type FetchResponseDatas = {
  status: string;
  data: {
    result: Array<{
      metric: { [key: string]: string };
      values: (string | number)[];
    }>;
  };
};

export type FetchResponseData = {
  status: string;
  data: {
    result: Array<{
      metric: { [key: string]: string };
      value: (string | number)[];
    }>;
  };
};

export type MetricsData = {
  metric: string;
  time: string[] | string;
  value: number[] | number;
};

// res.locals.metrics = DataByType[];
export interface DataByType {
  nodeName: string;
  cluster: string;
  exportedContainer: string;
  exportedNamespace: string;
  exportedPod: string;
  model: string;
  date: Date;
  metrics: MetricsData[];
}
