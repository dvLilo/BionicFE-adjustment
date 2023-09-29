import { createSlice } from "@reduxjs/toolkit"

export const themes = createSlice({
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

export const { darkMode, lightMode } = themes.actions

export default themes.reducer