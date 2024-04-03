import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  _id: string;
}

export type SendSnapshotArg = {
  data: ApiData;
  userId: string;
};

// database communication with server
export const snapshotsApiSlice = createApi({
  reducerPath: 'snapshotsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/snapshots' }),
  endpoints: (builder) => ({
    getSnapshots: builder.query<Snapshot[], void>({
      query: (userId) => ({ url: `/${userId}` }),
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
          url: `${newSnapshotData._id}`,
          method: 'PATCH',
          body: newSnapshotData,
        };
      },
    }),
    getOneSnapshot: builder.query<Snapshot, string>({
      query: (id) => ({ url: `/one/${id}`, method: 'GET' }),
    }),
    deleteSnapshots: builder.mutation<Snapshot, string>({
      query: (id) => ({
        url: `${id}`,
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
  useGetOneSnapshotQuery,
  useDeleteSnapshotsMutation, //deleting the snapshot
} = snapshotsApiSlice;
