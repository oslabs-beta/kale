import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
  },
});

export const { setMetrics } = metricsSlice.actions;
