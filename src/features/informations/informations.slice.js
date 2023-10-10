import queryString from "query-string"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const informationsApi = createApi({
  reducerPath: "informationsApi",
  tagTypes: ["Informations"],
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
    getInformations: builder.query({
      query: (params) => ({
        url: "/api/informations",
        method: "GET",
        params: params
      }),
      providesTags: ["Informations"]
    }),
    updateInformations: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/api/informations/" + id,
        method: "PUT",
        body: body
      }),
      invalidatesTags: (_, error) => error ? [] : ["Informations"]
    })
  })
})

export const { useLazyGetInformationsQuery, useUpdateInformationsMutation } = informationsApi