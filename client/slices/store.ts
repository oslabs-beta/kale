import { configureStore } from '@reduxjs/toolkit';
import { metricsApiSlice } from './metricsApi';
import { metricsSlice } from './metricsSlice';
import { uiSlice } from './uiSlice';
import { useDispatch } from 'react-redux';
import { userApi } from './userApi';
import { userSlice } from './userSlice';
const store = configureStore({
  reducer: {
    metrics: metricsSlice.reducer,
    metricsApi: metricsApiSlice.reducer,
    ui: uiSlice.reducer,
    userApi: userApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(metricsApiSlice.middleware)
      .concat(userApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
