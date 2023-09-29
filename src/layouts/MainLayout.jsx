import { Outlet } from "react-router-dom"

import {
  Box
} from "@mui/material"

import Navbar from "../components/Navbar"

const MainLayout = () => {
  return (
    <Box className="bioncMainLayout">
      <Navbar />
      <Outlet />
    </Box>
  )
}

export default MainLayout