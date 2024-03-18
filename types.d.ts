// Interface for individual metric types (consider specific number or unit types)
export type Metric = {
  [key: string]: number | string; // Flexible for various metric types
};

// Interface for the entire state
export type MetricsState = {
  name: string;
  driverVersion: string;
  gpuUtilizationPercentage: Metric;
  powerDrawPercentage: Metric;
  temperatureCelsius: Metric;
  fanSpeedPercentage: Metric;
  memoryUtilizationPercentage: Metric;
  memoryAllocation: Metric;
};
