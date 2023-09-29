import { createSlice } from "@reduxjs/toolkit"

export const theme = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("theme") || "light"
  },
  reducers: {
    darkMode: () => {
      return {
        mode: "dark"
      }
    },
    lightMode: () => {
      return {
        mode: "light"
      }
    }
  }
})

export const { darkMode, lightMode } = theme.actions

export default theme.reducer