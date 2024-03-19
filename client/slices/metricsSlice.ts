import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MetricsState } from '../../types.d';

const initialState: MetricsState = {
  input: '',
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    saveUrl: (state, action: PayloadAction<string>) => {
      state.input += action.payload;
    },
  },
});

export const { saveUrl } = metricsSlice.actions;
