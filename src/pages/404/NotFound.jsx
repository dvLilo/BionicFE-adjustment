import { useNavigate } from "react-router-dom"

import {
  Box,
  Button,
  Stack,
  Typography
} from "@mui/material"

import {
  ChevronLeft
} from "@mui/icons-material"

import Absent from "../../assets/images/absent.svg"

import "../../assets/styles/absent.styles.scss"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box className="bioncNotFound">
      <Stack direction="column" justifyContent="center" alignItems="center" flex={1}>
        <img className="bioncNotFound__logo" src={Absent} alt="404" />

        <Typography className="bioncNotFound__title" variant="h1">Oops!</Typography>

        <Typography className="bioncNotFound__text" variant="body1">
          The page you are looking for might have been removed, had its name changed or its temporary unavailabe.
        </Typography>

        <Button size="large" startIcon={<ChevronLeft />} onClick={() => navigate(-1)} disableElevation>Go Back</Button>
      </Stack>
    </Box>
  )
}

export default NotFound