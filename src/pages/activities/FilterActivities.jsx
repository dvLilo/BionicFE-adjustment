import { useRef } from "react"

import * as yup from "yup"

import moment from "moment"

import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material"

import {
  ChevronLeft,
  FilterAlt,
  Search
} from "@mui/icons-material"

import useDisclosure from "../../hooks/useDisclosure"

import DatePickerControlled from "../../components/controlled/DatePickerControlled"
import TextFieldControlled from "../../components/controlled/TextFieldControlled"
import AutoCompleteControlled from "../../components/controlled/AutoCompleteControlled"

import "../../assets/styles/filter.styles.scss"

const FilterActivities = ({
  errors = {},
  onFilter = () => { },
  slotProps: {
    filterButtonProps = {},
    searchButtonProps = {},
    clearButtonProps = {},
    closeButtonProps = {},
    fromInputProps = {},
    toInputProps = {},
    harvestDateInputProps = {},
    transactionNoInputProps = {},
    seriesNoInputProps = {},
    categoryInputProps = {},
    farmInputProps = {},
    buildingInputProps = {},
  } = {}
}) => {

  const anchorEl = useRef()

  const { open, onToggle, onClose } = useDisclosure()

  const {
    control,
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: null,

      from: null,
      to: null,

      event: null,
      name: "",
    }
  })

  const submitFilterHandler = (data) => {
    const params = {
      ...data,
      from: data.from && moment(data.from).set({ hour: 0, minute: 0, second: 0 }).format("YYYY-MM-DD HH:mm:ss"),
      to: data.to && moment(data.to).set({ hour: 23, minute: 59, second: 59 }).format("YYYY-MM-DD HH:mm:ss")
    }

    onFilter(params)
  }

  return (
    <Box className="bioncFilter">
      <Button variant="contained" ref={anchorEl} startIcon={<FilterAlt />} onClick={onToggle} disableElevation {...filterButtonProps}>Filter</Button>

      <Drawer
        open={open}
        anchor="right"
        PaperProps={{
          className: "bioncFilter__paper",
          component: "form",
          onSubmit: handleSubmit(submitFilterHandler)
        }}
        disablePortal
      >
        <Stack direction="row" alignItems="center">
          <IconButton onClick={onClose}>
            <ChevronLeft />
          </IconButton>

          <Typography className="bioncFilter__heading" variant="h5">Activity Filter</Typography>
        </Stack>

        <Stack direction="column" gap={2}>
          <AutoCompleteControlled
            control={control}
            name="type"
            options={TYPES}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
                size="small"
                helperText={errors?.type?.at(0)}
                error={!!errors?.type}
                fullWidth
              />
            )}
            disablePortal
            disableClearable
          />

          <DatePickerControlled
            control={control}
            name="from"
            renderInput={(params) => (
              <TextField
                {...params}
                label="From Date"
                size="small"
                helperText={errors?.from?.at(0)}
                error={!!errors?.from}
                fullWidth
              />
            )}
          />

          <DatePickerControlled
            control={control}
            name="to"
            renderInput={(params) => (
              <TextField
                {...params}
                label="To Date"
                size="small"
                helperText={errors?.to?.at(0)}
                error={!!errors?.to}
                fullWidth
              />
            )}
          />
        </Stack>

        <Divider />

        <Stack direction="column" gap={2}>
          <TextFieldControlled
            control={control}
            name="name"
            label="Causer (Optional)"
            size="small"
            fullWidth
          />

          <AutoCompleteControlled
            control={control}
            name="event"
            options={EVENTS}
            renderInput={(params) => (
              <TextField {...params} label="Event (Optional)" size="small" fullWidth />
            )}
            disablePortal
          />
        </Stack>

        <Stack direction="row" gap={1} marginTop="auto">
          <Button type="submit" variant="contained" startIcon={<Search />} disableElevation>Search</Button>
          <Button variant="contained" color="error" onClick={() => reset()} disableElevation>Clear</Button>
        </Stack>
      </Drawer>
    </Box >
  )
}

const schema = yup.object().shape({
  type: yup.string().nullable(),
  from: yup.date().nullable(),
  to: yup.date().nullable(),

  event: yup.string().nullable(),
  name: yup.string().nullable()
})

const TYPES = [
  "SUMMARIZED",
  "DETAILED"
]

const EVENTS = [
  "UPDATED",
  "DELETED"
]

// const CATEGORIES = [
//   "RDF",
//   "BIYAHERO"
// ]

// const FARMS = [
//   "LARA 1",
//   "LARA 2",
//   "RANGER",
//   "PORAC",
//   "TREKKER",
//   "CALSARA",
//   "SANTOS",
//   "DIZONPORAC",
//   "PULUNGSANTOL",
//   "MAGALANG",
//   "GOLDEN EAGLE",
//   "CAPAS",
//   "UMINGAN",
//   "MONCADA"
// ]

// const BUILDINGS = [
//   "Bldg 1",
//   "Bldg 2",
//   "Bldg 3",
//   "Bldg 4",
//   "Bldg 5",
//   "Bldg 6",
//   "Bldg 7",
//   "Bldg 8",
//   "Bldg 9",
//   "Bldg 10",
//   "Bldg 11",
//   "Bldg 12",
//   "Bldg 1A",
//   "Bldg 1B",
//   "Bldg 2A",
//   "Bldg 2B",
//   "Bldg 3A",
//   "Bldg 3B",
//   "Bldg 4A",
//   "Bldg 4B",
//   "Bldg 5A",
//   "Bldg 5B",
//   "Bldg 6A",
//   "Bldg 6B",
//   "Bldg 7A",
//   "Bldg 7B",
//   "Bldg 8A",
//   "Bldg 8B"
// ]

export default FilterActivities