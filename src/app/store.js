import { configureStore } from '@reduxjs/toolkit/'
import { setupListeners } from '@reduxjs/toolkit/query'

import { transactionsApi } from "../features/transactions/transactions.slice"
import { informationsApi } from "../features/informations/informations.slice"

export const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [informationsApi.reducerPath]: informationsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([transactionsApi.middleware, informationsApi.middleware]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)