import * as yup from "yup"

import moment from "moment"

import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import {
  useRef,
  useState
} from "react"

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

import DatePickerControlled from "./controlled/DatePickerControlled"
import TextFieldControlled from "./controlled/TextFieldControlled"
import AutoCompleteControlled from "./controlled/AutoCompleteControlled"

import "../assets/styles/filter.styles.scss"

const Filter = ({
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

  const [open, setOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      from: null,
      to: null,
      date_harvest: null,

      transaction_no: "",
      series_no: "06202309",

      category: null,
      farm: null,
      building: null,
    }
  })

  const toggleFilterHandler = () => {
    setOpen((value) => !value)
  }

  const closeFilterHandler = () => {
    setOpen(false)
  }

  const sumbitFilterHandler = (data) => {
    const params = {
      ...data,
      from: data.from && moment(data.from).format("YYYY-MM-DD"),
      to: data.to && moment(data.to).format("YYYY-MM-DD"),
      date_harvest: data.date_harvest && moment(data.date_harvest).format("YYYY-MM-DD"),
    }

    onFilter(params)
  }

  return (
    <Box className="bioncFilter">
      <Button variant="contained" ref={anchorEl} startIcon={<FilterAlt />} onClick={toggleFilterHandler} disableElevation {...filterButtonProps}>Filter</Button>

      <Drawer
        open={open}
        anchor="right"
        PaperProps={{
          className: "bioncFilter__paper",
          component: "form",
          onSubmit: handleSubmit(sumbitFilterHandler)
        }}
        disablePortal
      >
        <Stack direction="row" alignItems="center">
          <IconButton onClick={closeFilterHandler}>
            <ChevronLeft />
          </IconButton>

          <Typography className="bioncFilter__heading" variant="h5">Search Filter</Typography>
        </Stack>

        <Stack direction="column" gap={2}>
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
            disabled={
              !!watch("date_harvest")
            }
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
            disabled={
              !!watch("date_harvest")
            }
          />

          <Divider variant="middle">Or</Divider>

          <DatePickerControlled
            control={control}
            name="date_harvest"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Harvest Date"
                size="small"
                helperText={errors?.date_harvest?.at(0)}
                error={!!errors?.date_harvest}
                fullWidth
              />
            )}
            disabled={
              !!watch("from") || !!watch("to")
            }
          />
        </Stack>

        <Divider />

        <Stack direction="column" gap={2}>
          <TextFieldControlled
            control={control}
            name="transaction_no"
            type="number"
            label="Transaction No."
            size="small"
            helperText={errors?.transaction_no?.at(0)}
            error={!!errors?.transaction_no}
            inputProps={{
              min: 1
            }}
            fullWidth

            {...transactionNoInputProps}
          />

          <TextFieldControlled
            control={control}
            name="series_no"
            type="number"
            label="Series No."
            size="small"
            helperText={errors?.series_no?.at(0)}
            error={!!errors?.series_no}
            inputProps={{
              min: 1
            }}
            fullWidth
          />
        </Stack>

        <Divider />

        <Stack direction="column" gap={2}>
          <AutoCompleteControlled
            control={control}
            name="category"
            options={CATEGORIES}
            renderInput={(params) => (
              <TextField {...params} label="Category (Optional)" size="small" fullWidth />
            )}
            disablePortal
          />

          <AutoCompleteControlled
            control={control}
            name="farm"
            options={FARMS}
            renderInput={(params) => (
              <TextField {...params} label="Farm (Optional)" size="small" fullWidth />
            )}
            disablePortal
          />

          <AutoCompleteControlled
            control={control}
            name="building"
            options={BUILDINGS}
            renderInput={(params) => (
              <TextField {...params} label="Building (Optional)" size="small" fullWidth />
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
  from: yup.date().nullable(),
  to: yup.date().nullable(),
  date_harvest: yup.date().nullable(),

  transaction_no: yup.string().nullable(),
  series_no: yup.string().nullable(),

  category: yup.string().nullable(),
  farm: yup.string().nullable(),
  building: yup.string().nullable()
})

const CATEGORIES = [
  "RDF",
  "BIYAHERO"
]

const FARMS = [
  "LARA 1",
  "LARA 2",
  "RANGER",
  "PORAC",
  "TREKKER",
  "CALSARA",
  "SANTOS",
  "DIZONPORAC",
  "PULUNGSANTOL",
  "MAGALANG",
  "GOLDEN EAGLE",
  "CAPAS",
  "UMINGAN",
  "MONCADA"
]

const BUILDINGS = [
  "Bldg 1",
  "Bldg 2",
  "Bldg 3",
  "Bldg 4",
  "Bldg 5",
  "Bldg 6",
  "Bldg 7",
  "Bldg 8",
  "Bldg 9",
  "Bldg 10",
  "Bldg 1A",
  "Bldg 1B",
  "Bldg 2A",
  "Bldg 2B",
  "Bldg 3A",
  "Bldg 3B",
  "Bldg 4A",
  "Bldg 4B",
  "Bldg 5A",
  "Bldg 5B",
  "Bldg 6A",
  "Bldg 6B",
  "Bldg 7A",
  "Bldg 7B",
  "Bldg 8A",
  "Bldg 8B"
]

export default Filter