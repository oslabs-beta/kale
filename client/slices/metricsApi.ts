import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  _id: string;
}

type queryArg = { url: string; podName: string };

// API communication with server
export const metricsApiSlice = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    grabMetrics: builder.mutation<ApiData, queryArg>({
      query: ({ url, podName }: queryArg) => ({
        url: 'api',
        method: 'POST',
        body: { url, podName },
      }),
    }),
    getSnapshots: builder.query<Snapshot[], void>({
      query: () => 'snapshots',
    }),
    sendSnapshots: builder.mutation({
      query: (data: ApiData) => ({
        url: 'snapshots',
        method: 'POST',
        body: { snapshot: data },
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
  useGrabMetricsMutation, //sending a post request using url
  useGetSnapshotsQuery, // (for history page)
  useSendSnapshotsMutation, // send post request to post snapshot
  useUpdateSnapshotsMutation, //STRETCH: update the snapshot
  useDeleteSnapshotsMutation, //deleting the snapshot
} = metricsApiSlice;
