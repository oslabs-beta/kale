import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  _id: string;
}

// API communication with server
export const metricsApiSlice = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: (url: URL) => ({
        url: 'api',
        method: 'GET',
        body: url,
      }),
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    // grabMetrics: builder.mutation<Snapshot[], URL>({
    //   query: (url: URL) => ({
    //     url: 'api',
    //     method: 'POST',
    //     body: url,
    //   }),
    // }),
    getSnapshots: builder.query<Snapshot[], void>({
      query: () => 'snapshots',
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
          url: `snapshots/${newSnapshotData._id}`,
          method: 'PATCH',
          body: newSnapshotData,
        };
      },
    }),
    deleteSnapshots: builder.mutation<Snapshot, string>({
      query: (id) => ({
        url: `snapshots/${id}`,
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
  // useGrabMetricsMutation, //sending a post request using url
  useGetSnapshotsQuery, // (for history page)
  useSendSnapshotsMutation, // send post request to post snapshot
  useUpdateSnapshotsMutation, //STRETCH: update the snapshot
  useDeleteSnapshotsMutation, //deleting the snapshot
} = metricsApiSlice;
