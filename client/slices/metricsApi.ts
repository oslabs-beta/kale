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
    })
  }),
});

export const {
  useGrabMetricsMutation, //sending a post request using url
} = metricsApiSlice;
