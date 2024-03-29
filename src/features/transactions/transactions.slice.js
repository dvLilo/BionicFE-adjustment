import queryString from 'query-string'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  tagTypes: ["Transaction"],
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
    getTransactions: builder.query({
      query: (params) => ({
        url: "/api/transactions",
        method: "GET",
        params: params
      }),
      providesTags: ["Transaction"]
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/api/transactions/" + id,
        method: "PUT",
        body: body
      }),
      invalidatesTags: (_, error) => error ? [] : ["Transaction"]
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: "/api/transactions/" + id,
        method: "DELETE"
      }),
      invalidatesTags: (_, error) => error ? [] : ["Transaction"]
    })
  })
})

export const { useLazyGetTransactionsQuery, useDeleteTransactionMutation, useUpdateTransactionMutation } = transactionsApi