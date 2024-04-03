import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData } from '../../types.d';

export interface Snapshot extends ApiData {
  user: string;
}

export interface SnapshotWithId extends ApiData {
  user: string;
  _id: string;
}

// database communication with server
export const snapshotsApiSlice = createApi({
  reducerPath: 'snapshotsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/snapshots' }),
  endpoints: (builder) => ({
    getSnapshots: builder.query<SnapshotWithId[], void>({
      query: (userId) => ({ url: `/${userId}` }),
    }),
    sendSnapshots: builder.mutation<Snapshot, Snapshot>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: {
          snapshot: data,
        },
      }),
    }),
    updateSnapshots: builder.mutation<Snapshot, Partial<Snapshot>>({
      query: (newSnapshotData: Partial<Snapshot>) => {
        return {
          url: `${newSnapshotData.user}`,
          method: 'PATCH',
          body: newSnapshotData,
        };
      },
    }),
    getOneSnapshot: builder.query<SnapshotWithId, string>({
      query: (id) => ({ url: `/one/${id}`, method: 'GET' }),
    }),
    deleteSnapshots: builder.mutation<SnapshotWithId, string>({
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
