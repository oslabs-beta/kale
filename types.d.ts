// type for each metric
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

export type ClusterInputState = {
  input: string;
};

/*
// example
res.locals.metrics = {
  podName: 'hello-app-67dbb49698-2bs8k',
  date: '2021-08-04',
  metrics: {
    gpuUsage: {
      metric: 'GPU_Usage',
      time: ['12:00:00', '12:01:00', '12:02:00'],
      value: [0.1, 0.2, 0.3],
    },
    memoryUsage: {
      metric: 'Memory_Usage',
      time: ['12:00:00', '12:01:00', '12:02:00'],
      value: [0.1, 0.2, 0.3],
    },
  },
};
}
*/
