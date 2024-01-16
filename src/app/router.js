import {
  createBrowserRouter,
} from "react-router-dom"

import Private from "../components/Private"

import MainLayout from "../layouts/MainLayout"

import Login from "../pages/landing/Login"

import Transaction from "../pages/transaction/Transaction"
import Information from "../pages/information/Information"

import Reports from "../pages/reports/Reports"

import NotFound from "../pages/404/NotFound"


export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/",
    element: <Login />
  },
  {
    element: <Private Render={MainLayout} />,
    children: [
      {
        path: "/summarized",
        element: <Information />
      },
      {
        path: "/detailed",
        element: <Transaction />
      },
      {
        path: "/reports",
        element: <Reports />
      }
    ]
  }
], { basename: "/bionic" })