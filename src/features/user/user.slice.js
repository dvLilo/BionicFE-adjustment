import { createSlice } from "@reduxjs/toolkit"

export const user = createSlice({
  name: "user",
  initialState: localStorage.getItem("user"),
  reducers: {
    setUserDetails: (_, actions) => {
      return actions.payload
    },
    clearUserDetails: () => {
      return null
    }
  }
})

export const { setUserDetails, clearUserDetails } = user.actions

export default user.reducer