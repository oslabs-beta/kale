import { configureStore } from '@reduxjs/toolkit';
import { metricsApiSlice } from './metricsApi.js';
import { metricsSlice } from './metricsSlice.js';

export default configureStore({
  reducer: {
    metricsSlice: metricsSlice.reducer,
    metricsApi: metricsApiSlice.reducer,
  },
});
