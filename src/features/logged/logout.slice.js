import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const logoutApi = createApi({
  reducerPath: "logoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json")
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`)

      return headers
    },
  }),
  endpoints: (builder) => ({
    signOut: builder.mutation({
      query: () => ({
        url: "/api/logout",
        method: "POST"
      })
    })
  })
})

export const { useSignOutMutation } = logoutApi