import { configureStore } from '@reduxjs/toolkit';
import { metricsApiSlice } from './metricsApi';
import metricsSlice from './metricsSlice';
import { uiSlice } from './uiSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    metrics: metricsSlice.reducer,
    metricsApi: metricsApiSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metricsApiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
