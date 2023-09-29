import React from "react"
import ReactDOM from "react-dom/client"

import { Provider } from "react-redux"
import { store } from "./app/store"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

import { SnackbarProvider } from "notistack"

import "./assets/global.scss"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
)

