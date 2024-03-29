export type singleMetric = {
  name: string;
  time: string;
  value: string;
};

export type timeseriesMetric = {
  name: string;
  time: string[];
  value: string[];
};

// res.locals.metrics = DataByType[];
export interface DataByType {
  nodeName: string;
  cluster: string;
  exportedContainer?: string;
  exportedNamespace?: string;
  exportedPod?: string;
  modelName: string;
  date: Date;
}

export interface singleData extends DataByType {
  metrics: singleMetric[];
}

export interface timeseriesData extends DataByType {
  metrics: timeseriesMetric[];
}

export type ErrorMessage = {
  err: string;
};
export type ServerError = {
  log: string;
  status: number;
  message: ErrorMessage;
};

export type FetchResponseData = {
  queryDesc: string;
  status: string;
  data: {
    result: Array<{
      metric: { [key: string]: string };
      value: (string | number)[];
    }>;
  };
};

export type MetricsState = {
  userId: string | '';
  dataAll: timeseriesData[] | null;
};
