import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  _id: string;
}

const URL = 'https://a9abd903-f585-46ab-b66f-b18d23232503.mock.pstmn.io/';

// API communication with server
export const metricsApiSlice = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => 'api/metrics',
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
  useGetMetricsQuery,
  useGetSnapshotsQuery,
  useUpdateSnapshotsMutation,
  useDeleteSnapshotsMutation,
  useGrabMetricsMutation,
} = metricsApiSlice;
