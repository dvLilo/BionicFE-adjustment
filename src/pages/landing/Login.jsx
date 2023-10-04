import * as yup from "yup"

import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import { useDispatch } from "react-redux"

import { useNavigate } from "react-router-dom"

import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material"

import {
  LoadingButton
} from "@mui/lab"

import {
  Lock,
  Person,
  Visibility,
  VisibilityOff
} from "@mui/icons-material"

import Logo from "../../assets/images/logo.png"

import useSweetAlert from "../../hooks/useSweetAlert"
import useDisclosure from "../../hooks/useDisclosure"

import { signIn } from "../../features/auth/auth.slice"
import { setUserDetails } from "../../features/user/user.slice"

import { useSignInMutation } from "../../features/logged/login.slice"

import "../../assets/styles/login.styles.scss"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { open: isVisible, onToggle: onVisibleToggle } = useDisclosure()
  const { open: isUsernameFocused, onToggle: onUsernameFocusedToggle } = useDisclosure()
  const { open: isPasswordFocused, onToggle: onPasswordFocusedToggle } = useDisclosure()

  const { toast } = useSweetAlert()

  const [logIn, { isLoading }] = useSignInMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const submitLoginHandler = async (data) => {
    try {
      const res = await logIn(data).unwrap()

      localStorage.setItem("token", res.result.token)
      localStorage.setItem("user", JSON.stringify(res.result))

      dispatch(signIn())
      dispatch(setUserDetails(res.result))

      navigate("/summarized", { replace: true })

    } catch (error) {
      if (error.status === 401) {
        return toast({
          icon: "error",
          title: "Error!",
          text: error.data.message,
        })
      }

      toast({
        icon: "error",
        title: "Error!",
        text: "Something went wrong whilst trying to login. Please try again later.",
      })
    }
  }

  return (
    <Box className="bioncLanding">
      <Stack className="bioncLanding__container" direction={{ md: "column", lg: "row" }}>
        <Stack className="bioncLanding__section" direction="column" justifyContent="center" alignItems="center">
          <img className="bioncLanding__logo" alt="Bionic Logo" src={Logo} />
        </Stack>

        <Stack className="bioncLanding__section bioncLanding__form" direction="column" component="form" onSubmit={handleSubmit(submitLoginHandler)}>
          <Typography className="bioncLanding__title" variant="h4">Fresh Morning</Typography>
          <Typography variant="subtitle1">Please sign-in to continue..</Typography>

          <Stack direction="column" gap={2} flex={1} marginTop={4}>
            <TextField
              {...register("username")}
              className="bioncLanding__textfield"
              label="Username"
              helperText={errors?.username?.message}
              error={!!errors.username}
              InputProps={{
                classes: {
                  input: "bioncLanding__input",
                  notchedOutline: "bioncLanding__notch",
                },
                startAdornment: (
                  <Person className="bioncLanding__icon" />
                )
              }}
              InputLabelProps={{
                classes: {
                  root: "bioncLanding__label",
                  focused: "bioncLanding__label--focus",
                  filled: "bioncLanding__label--filled"
                },
                shrink: isUsernameFocused || !!watch("username")
              }}
              onFocus={onUsernameFocusedToggle}
              onBlur={onUsernameFocusedToggle}
              fullWidth
            />

            <TextField
              {...register("password")}
              className="bioncLanding__textfield"
              label="Password"
              helperText={errors?.password?.message}
              error={!!errors.password}
              inputProps={{
                type: isVisible ? "text" : "password"
              }}
              InputProps={{
                classes: {
                  input: "bioncLanding__input",
                  notchedOutline: "bioncLanding__notch",
                },
                startAdornment: (
                  <Lock className="bioncLanding__icon" />
                ),
                endAdornment: (
                  <IconButton className="bioncLanding__iconbutton" onClick={onVisibleToggle}>
                    {isVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
              InputLabelProps={{
                classes: {
                  root: "bioncLanding__label",
                  focused: "bioncLanding__label--focus",
                  filled: "bioncLanding__label--filled"
                },
                shrink: isPasswordFocused || !!watch("password")
              }}
              onFocus={onPasswordFocusedToggle}
              onBlur={onPasswordFocusedToggle}
              fullWidth
            />

            <LoadingButton
              className="bioncLanding__button"
              variant="contained"
              type="submit"
              size="large"
              loading={isLoading}
              disableElevation
            >
              Sign In
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="column" alignItems="center">
        <Typography variant="subtitle1">
          Bionic &copy; 2023
        </Typography>

        <Typography variant="subtitle2">
          Powered by Management Information System
        </Typography>
      </Stack>
    </Box>
  )
}

const schema = yup.object().shape({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password")
})

export default Login