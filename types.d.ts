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
  input: string;
  //error: { status: number; data: any } | null;
};


