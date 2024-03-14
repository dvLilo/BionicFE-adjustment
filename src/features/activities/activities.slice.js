import queryString from 'query-string'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const activitiesApi = createApi({
  reducerPath: "activitiesApi",
  tagTypes: ["Activities"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json")
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`)

      return headers
    },
    paramsSerializer: (params) => {
      return queryString.stringify(params, {
        skipNull: true
      })
    }
  }),
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: (params) => ({
        url: "/api/activities",
        method: "GET",
        params: params
      }),
      providesTags: ["Activities"]
    })
  })
})

export const { useLazyGetActivitiesQuery } = activitiesApi