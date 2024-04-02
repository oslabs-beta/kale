import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  _id: string;
}

export type SendSnapshotArg = {
    data: ApiData,
    userId: string
}

// database communication with server
export const snapshotsApiSlice = createApi({
  reducerPath: 'snapshotsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/user' }),
  endpoints: (builder) => ({
    getSnapshots: builder.query<Snapshot[], void>({
      query: (userId) => `/${userId}`,
    }),
    sendSnapshots: builder.mutation<Snapshot, SendSnapshotArg>({
      query: ({ data, userId }) => ({
        url: 'snapshots',
        method: 'POST',
        body: {
          userId: userId,
          snapshot: data,
        },
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
  snapshotsApiSlice.endpoints.getSnapshots.useQueryState;
export const useSnapshotQuerySubscription =
  snapshotsApiSlice.endpoints.getSnapshots.useQuerySubscription;

export const {
  useGetSnapshotsQuery, // (for history page)
  useSendSnapshotsMutation, // send post request to post snapshot
  useUpdateSnapshotsMutation, //STRETCH: update the snapshot
  useDeleteSnapshotsMutation, //deleting the snapshot
} = snapshotsApiSlice;
