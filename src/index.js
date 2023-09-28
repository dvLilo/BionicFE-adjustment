import React from "react"
import ReactDOM from "react-dom/client"

import { Provider } from "react-redux"
import { store } from "./app/store"

import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./themes/theme"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

import { SnackbarProvider } from "notistack"

import "./assets/global.scss"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <SnackbarProvider>
            <CssBaseline />

            <App />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

