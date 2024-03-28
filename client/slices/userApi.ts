import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/create', //talk to Ismael ask for endpoint
        method: 'POST',
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: `/signIn`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = userApi;
