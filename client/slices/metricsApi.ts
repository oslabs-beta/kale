import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  _id: string;
}

const URL = 'https://5491ba09-282b-49c6-b362-1b0f4e4e6f58.mock.pstmn.io';

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
        body: data,
      }),
    }),
    getSnapshots: builder.query<Snapshot[], void>({
      query: () => 'snapshot',
    }),
    sendSnapshots: builder.mutation({
      query: (data: any) => ({
        url: 'snapshots',
        method: 'POST',
        body: data,
      }),
    }),
    updateSnapshots: builder.mutation<Snapshot, Partial<Snapshot>>({
      query: (newSnapshotData: Partial<Snapshot>) => {
        return {
          url: `snapshot/${newSnapshotData._id}`,
          method: 'PATCH',
          body: newSnapshotData,
        };
      },
    }),
    deleteSnapshots: builder.mutation<Snapshot, string>({
      query: (id) => ({
        url: `snapshot/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const useGetSnapshotState =
  metricsApiSlice.endpoints.getSnapshots.useQueryState;
export const useSnapshotQuerySubscription =
  metricsApiSlice.endpoints.getSnapshots.useQuerySubscription;

export const {
  useGetMetricsQuery, //grab from mock data (fortesting)
  useGrabMetricsMutation, //sending a post request using url
  useGetSnapshotsQuery, // (for history page)
  useSendSnapshotsMutation, // send post request to post snapshot
  useUpdateSnapshotsMutation, //STRETCH: update the snapshot
  useDeleteSnapshotsMutation, //deleting the snapshot
} = metricsApiSlice;
