import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Interface for individual metric types (consider specific number or unit types)
interface Metric {
  [key: string]: number | string; // Flexible for various metric types
}

// Interface for the entire state
interface MetricsState {
  name: string;
  driverVersion: string;
  gpuUtilizationPercentage: Metric;
  powerDrawPercentage: Metric;
  temperatureCelsius: Metric;
  fanSpeedPercentage: Metric;
  memoryUtilizationPercentage: Metric;
  memoryAllocation: Metric;
}

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
