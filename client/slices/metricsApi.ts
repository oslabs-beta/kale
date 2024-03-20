import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

const URL = 'https://3196ddeb-8f88-4dd3-999a-81ed7b21cd7c.mock.pstmn.io/api/';

// API communication with server
export const metricsApiSlice = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => 'metrics',
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    grabMetrics: builder.mutation({
      query: (data: any) => ({
        url: 'send',
        method: 'POST',
        body: data
    })
    }),
    getSnapshots: builder.query({
      query: () => 'snapshots',
    }),
    sendSnapshots: builder.mutation({
      query: (data: any) => ({
        url: 'snapshots',
        method: 'POST',
        body: data
    })
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
  useGetMetricsQuery, //grab from mock data (fortesting)
  useGrabMetricsMutation,   //sending a post request using url
  useGetSnapshotsQuery, // (for history page)
  useSendSnapshotsMutation, // send post request to post snapshot
  useUpdateSnapshotsMutation,  //STRETCH: update the snapshot
  useDeleteSnapshotsMutation, //deleting the snapshot
} = metricsApiSlice;
