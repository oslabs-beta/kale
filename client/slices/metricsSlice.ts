import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
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
