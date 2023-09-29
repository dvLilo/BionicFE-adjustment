import { Link } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { darkMode, lightMode } from "../features/themes/themes.slice"

import {
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material"

import {
  DarkMode,
  LightMode,
  Logout,
  Menu,
  Sort
} from "@mui/icons-material"

import Logo from "../assets/images/logo.png"

import "../assets/styles/navbar.styles.scss"

const Navbar = () => {

  const dispatch = useDispatch()

  const mode = useSelector((state) => state.theme.mode)

  const changeModeHandler = () => {
    if (mode === "dark") {
      localStorage.setItem("theme", "light")

      return dispatch(lightMode())
    }

    localStorage.setItem("theme", "dark")

    dispatch(darkMode())
  }

  return (
    <Stack className="bioncNavbar" direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={4}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <img className="bioncNavbar__logo" src={Logo} alt="Bionic" />

          <Typography className="bioncNavbar__title" variant="h4">Bionic</Typography>
          <Typography className="bioncNavbar__title" variant="h4">Distro</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Button className="bioncNavbar__link" size="large" color="info" to="/summarized" component={Link} startIcon={<Sort />}>Summarized</Button>
          <Button className="bioncNavbar__link" size="large" color="info" to="/detailed" component={Link} startIcon={<Menu />}>Detailed</Button>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={changeModeHandler}>
          <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"} arrow>
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </Tooltip>
        </IconButton>

        <IconButton>
          <Tooltip title="Sign Out" arrow>
            <Logout />
          </Tooltip>
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default Navbar