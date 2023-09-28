import {
  createBrowserRouter,
} from 'react-router-dom'

import Login from '../pages/landing/Login'

import Transaction from '../pages/transaction/Transaction'


export const router = createBrowserRouter([
  {
    path: "*",
    element: <><h1>Hello, wanderer.</h1><h2>This page doesn't exist.</h2></>
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "transaction",
    element: <Transaction />
  }
], { basename: "/" })