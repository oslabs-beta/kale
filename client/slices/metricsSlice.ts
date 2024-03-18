import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Interface for individual metric types (consider specific number or unit types)
type Metric = {
  [key: string]: number[]; // Flexible for various metric types
};

// Interface for the entire state
type MetricsState = {
  name: string;
  driverVersion: string;
  gpuUtilizationPercentage: Metric;
  powerDrawPercentage: Metric;
  temperatureCelsius: Metric;
  fanSpeedPercentage: Metric;
  memoryUtilizationPercentage: Metric;
  memoryAllocation: Metric;
};

type SliceState =
  | { status: 'idle'; value: MetricsState }
  | { status: 'loading'; value: MetricsState }
  | { status: 'failed'; error: string; value: MetricsState };

const initialState: MetricsState = {
  name: '',
  driverVersion: '',
  gpuUtilizationPercentage: {},
  powerDrawPercentage: {},
  temperatureCelsius: {},
  fanSpeedPercentage: {},
  memoryUtilizationPercentage: {},
  memoryAllocation: {},
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<MetricsState>) => {
      // Replace entire state object for clarity and type safety
      return action.payload;
    },
  },
});

export const { setMetrics } = metricsSlice.actions;
