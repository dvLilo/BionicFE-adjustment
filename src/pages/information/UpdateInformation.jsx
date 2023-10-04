import { useEffect } from "react"

import moment from "moment"

import * as yup from "yup"

import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import {
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material"

import {
  LoadingButton
} from "@mui/lab"

import {
  Check,
  ChevronLeft
} from "@mui/icons-material"

import useSweetAlert from "../../hooks/useSweetAlert"

import DatePickerControlled from "../../components/controlled/DatePickerControlled"
import TextFieldControlled from "../../components/controlled/TextFieldControlled"
import AutoCompleteControlled from "../../components/controlled/AutoCompleteControlled"

import { useUpdateInformationsMutation } from "../../features/informations/informations.slice"

const UpdateInformation = ({
  open = false,
  data = null,
  onClose = () => { }
}) => {

  const { confirm, toast } = useSweetAlert()

  const [updateInformation, { isLoading }] = useUpdateInformationsMutation()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",

      series_no: "",

      category: null,
      date_harvest: null,

      farm: null,
      building: null,
      leadman: "",
      checker: "",
      buyer: "",
      plate_no: ""
    }
  })

  useEffect(() => {
    if (open) {
      setValue("id", data?.id)

      setValue("series_no", data?.series_no.split("-").at(1))

      setValue("category", data?.category)
      setValue("date_harvest", data?.date_harvest)
      setValue("farm", data?.farm)
      setValue("building", data?.building)
      setValue("leadman", data?.leadman)
      setValue("checker", data?.checker)
      setValue("buyer", data?.buyer)
      setValue("plate_no", data?.plate_no)
    }
    // eslint-disable-next-line
  }, [open, data])

  const cancelUpdateHandler = () => {
    reset()
    onClose()
  }

  const submitUpdateHandler = (data) => {
    const body = {
      ...data,
      date_harvest: data.date_harvest && moment(data.date_harvest).format("YYYY-MM-DD"),
    }

    confirm({
      onConfirm: async () => {
        try {
          await updateInformation(body).unwrap()

          toast({
            text: "Transaction has been updated."
          })
          cancelUpdateHandler()
        } catch (error) {
          if (error.status === 422) {
            Object.entries(error.data.errors).forEach((item) => {
              const [name, [message]] = item

              setError(name, {
                type: "manual",
                message: message
              })
            })

            return
          }

          toast({
            icon: "error",
            title: "Error!",
            text: "Something went wrong whilst trying to update this transaction. Please try again later.",
          })
        }
      }
    })
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      className="bioncTransactionForm"
      PaperProps={{
        className: "bioncTransactionForm__paper",
        component: "form",
        onSubmit: handleSubmit(submitUpdateHandler)
      }}
      disablePortal
    >
      <Stack direction="row" alignItems="center">
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>

        <Typography className="bioncFilter__heading" variant="h5">Update Transaction</Typography>
      </Stack>

      <Stack direction="column" gap={2}>
        <TextFieldControlled
          control={control}
          name="series_no"
          label="Series No."
          size="small"
          helperText={errors?.series_no?.message}
          error={!!errors?.series_no}
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <DatePickerControlled
          control={control}
          name="date_harvest"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Date Harvest"
              size="small"
              helperText={errors?.date_harvest?.message}
              error={!!errors?.date_harvest}
              fullWidth
            />
          )}
        />

        <AutoCompleteControlled
          control={control}
          name="category"
          options={CATEGORIES}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              size="small"
              helperText={errors?.category?.message}
              error={!!errors?.category}
              fullWidth
            />
          )}
          disablePortal
          disableClearable
        />

        <AutoCompleteControlled
          control={control}
          name="farm"
          options={FARMS}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Farm"
              size="small"
              helperText={errors?.farm?.message}
              error={!!errors?.farm}
              fullWidth
            />
          )}
          disablePortal
          disableClearable
        />

        <AutoCompleteControlled
          control={control}
          name="building"
          options={BUILDINGS}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Building"
              size="small"
              helperText={errors?.building?.message}
              error={!!errors?.building}
              fullWidth
            />
          )}
          disablePortal
          disableClearable
        />

        <TextFieldControlled
          control={control}
          name="leadman"
          label="Leadman"
          size="small"
          helperText={errors?.leadman?.message}
          error={!!errors?.leadman}
        />

        <TextFieldControlled
          control={control}
          name="checker"
          label="Checker"
          size="small"
          helperText={errors?.checker?.message}
          error={!!errors?.checker}
        />

        <TextFieldControlled
          control={control}
          name="buyer"
          label="Buyer"
          size="small"
          helperText={errors?.buyer?.message}
          error={!!errors?.buyer}
        />

        <TextFieldControlled
          control={control}
          name="plate_no"
          label="Plate No."
          size="small"
          helperText={errors?.plate_no?.message}
          error={!!errors?.plate_no}
        />
      </Stack>

      <Stack direction="row" gap={1} marginTop="auto">
        <LoadingButton type="submit" variant="contained" loading={isLoading} loadingPosition="start" startIcon={<Check />} disableElevation>Save</LoadingButton>
        <Button variant="contained" color="error" onClick={cancelUpdateHandler} disabled={isLoading} disableElevation>Cancel</Button>
      </Stack>
    </Drawer>
  )
}

const schema = yup.object().shape({
  id: yup.number().required(),

  series_no: yup.string().required().label("Series no."),

  category: yup.string().required().label("Category"),
  date_harvest: yup.date().required().label("Date harvest"),

  farm: yup.string().required().label("Farm"),
  building: yup.string().required().label("Building"),
  leadman: yup.string().required().label("Leadman"),
  checker: yup.string().required().label("Checker"),
  buyer: yup.string().required().label("Buyer"),
  plate_no: yup.string().required().label("Plate no.")
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
  "Bldg 11",
  "Bldg 12",
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

export default UpdateInformation