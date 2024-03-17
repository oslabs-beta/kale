import { configureStore } from '@reduxjs/toolkit';
import { metricsApiSlice } from './metricsApi';
import { metricsSlice } from './metricsSlice';

const store = configureStore({
  reducer: {
    metricsSlice: metricsSlice.reducer,
    metricsApi: metricsApiSlice.reducer,
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch