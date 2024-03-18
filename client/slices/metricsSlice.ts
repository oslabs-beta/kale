import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MetricsState, Metric } from '../../types.d';

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
