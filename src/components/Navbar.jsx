import { Link } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

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

import useSweetAlert from "../hooks/useSweetAlert"

import { signOut } from "../features/auth/auth.slice"
import { clearUserDetails } from "../features/user/user.slice"
import { darkMode, lightMode } from "../features/theme/theme.slice"

import { useSignOutMutation } from "../features/logged/logout.slice"

import "../assets/styles/navbar.styles.scss"

const Navbar = () => {

  const dispatch = useDispatch()

  const mode = useSelector((state) => state.theme.mode)

  const { toast } = useSweetAlert()

  const [logOut, { isLoading }] = useSignOutMutation()

  const changeModeHandler = () => {
    if (mode === "dark") {
      localStorage.setItem("theme", "light")

      return dispatch(lightMode())
    }

    localStorage.setItem("theme", "dark")

    dispatch(darkMode())
  }

  const submitLogOutHandler = async () => {
    try {
      await logOut().unwrap()

      localStorage.removeItem("token")
      localStorage.removeItem("user")

      dispatch(signOut())
      dispatch(clearUserDetails())

    } catch (error) {
      toast({
        icon: "error",
        title: "Error!",
        text: "Something went wrong whilst trying to login. Please try again later.",
      })
    }
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
        <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"} arrow>
          <IconButton onClick={changeModeHandler}>
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Sign Out" arrow>
          <IconButton onClick={submitLogOutHandler} disabled={isLoading}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}

export default Navbar