import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

const URL = 'https://3196ddeb-8f88-4dd3-999a-81ed7b21cd7c.mock.pstmn.io/api/';

// API communication with server
export const metricsApiSlice = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getMetrics: builder.query<ApiData, void>({
      query: () => 'metrics',
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    getSnapshots: builder.query<ApiData, void>({
      query: () => 'snapshots',
    }),
    updateSnapshots: builder.mutation({
      query: (snapshot) => ({
        url: 'snapshots',
        method: 'PATCH',
        body: snapshot,
      }),
    }),
    deleteSnapshots: builder.mutation({
      query: (snapshot) => ({
        url: 'snapshots',
        method: 'DELETE',
        body: snapshot,
      }),
    }),
  }),
});

export const {
  useGetMetricsQuery,
  useGetSnapshotsQuery,
  useUpdateSnapshotsMutation,
  useDeleteSnapshotsMutation,
} = metricsApiSlice;
