import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClusterInputState } from '../../types.d';

const initialState: ClusterInputState = {
  input: '',
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
