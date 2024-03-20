import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClusterInputState } from '../../types.d';

const initialState: ClusterInputState = {
  input: '',
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    // saveUrl: (state, action: PayloadAction<string>) => {
    //   state.input = action.payload;
    // },
  },
});

export const {} = metricsSlice.actions;
