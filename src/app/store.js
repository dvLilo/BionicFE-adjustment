import { configureStore } from '@reduxjs/toolkit/'
import { setupListeners } from '@reduxjs/toolkit/query'

import authRecuder from "../features/auth/auth.slice"
import userReducer from "../features/user/user.slice"
import themeReducer from "../features/theme/theme.slice"

import { loginApi } from "../features/logged/login.slice"
import { logoutApi } from "../features/logged/logout.slice"
import { transactionsApi } from "../features/transactions/transactions.slice"
import { informationsApi } from "../features/informations/informations.slice"
import { activitiesApi } from "../features/activities/activities.slice"

export const store = configureStore({
  reducer: {
    auth: authRecuder,
    user: userReducer,
    theme: themeReducer,

    [loginApi.reducerPath]: loginApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [informationsApi.reducerPath]: informationsApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loginApi.middleware, logoutApi.middleware, transactionsApi.middleware, informationsApi.middleware, activitiesApi.middleware]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)