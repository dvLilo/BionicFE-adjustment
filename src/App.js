import { useMemo } from "react"

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material"
import { deepmerge } from "@mui/utils"
import { custom } from "./themes/custom"

import { RouterProvider } from "react-router-dom"
import { router } from "./app/router"

import { useSelector } from "react-redux"

const App = () => {

  const mode = useSelector((state) => state.theme.mode)

  const theme = useMemo(() => {
    const themeCustom = createTheme({
      palette: {
        mode: mode
      }
    })

    return createTheme(deepmerge(custom, themeCustom))
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;