import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (params) => ({
        url: "/api/login",
        method: "POST",
        body: params
      })
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/api/logout",
        method: "POST"
      })
    })
  })
})

export const { useSignInMutation, useSignOutMutation } = loginApi