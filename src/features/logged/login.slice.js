import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (params) => ({
        url: "/api/login",
        method: "POST",
        body: params
      })
    })
  })
})

export const { useSignInMutation } = loginApi