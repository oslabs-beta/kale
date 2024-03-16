import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API communication with server
export const metricsApiSlice = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => 'metrics',
    }),
    getSnapshots: builder.query({
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
