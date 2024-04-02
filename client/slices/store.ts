import { configureStore } from '@reduxjs/toolkit';
import { metricsApiSlice } from './metricsApi';
import { snapshotsApiSlice } from './snapshotsApi';
import { uiSlice } from './uiSlice';
import { useDispatch } from 'react-redux';
import { userApi } from './userApi';
import { userSlice } from './userSlice';

const store = configureStore({
  reducer: {
    metricsApi: metricsApiSlice.reducer,
    snapshotsApi: snapshotsApiSlice.reducer,
    ui: uiSlice.reducer,
    userApi: userApi.reducer,
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(metricsApiSlice.middleware)
      .concat(snapshotsApiSlice.middleware)
      .concat(userApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
