import {
  createBrowserRouter,
} from "react-router-dom"

import Private from "../components/Private"

import MainLayout from "../layouts/MainLayout"

import Login from "../pages/landing/Login"

import Transaction from "../pages/transaction/Transaction"
import Information from "../pages/information/Information"


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
    element: <Private Render={MainLayout} />,
    children: [
      {
        path: "/summarized",
        element: <Information />
      },
      {
        path: "/detailed",
        element: <Transaction />
      }
    ]
  }
], { basename: "/" })