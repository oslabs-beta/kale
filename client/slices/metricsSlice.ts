import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MetricsState } from '../../types.d';

const initialState: MetricsState = {
  status: 'loading',
  error: null,
  data: null,
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    // setMetrics: (state, action: PayloadAction<SliceState>) => {
    //   // Replace entire state object for clarity and type safety
    //   return action.payload;
    // },
  },
});

export const {} = metricsSlice.actions;
