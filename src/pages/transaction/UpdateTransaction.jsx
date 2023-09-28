import { useEffect } from "react"

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

import TextFieldControlled from "../../components/controlled/TextFieldControlled"
import DatePickerControlled from "../../components/controlled/DatePickerControlled"

import { useUpdateTransactionMutation } from "../../features/transactions/transactions.slice"

const UpdateTransaction = ({
  open = false,
  data = null,
  onClose = () => { }
}) => {

  const { confirm, toast } = useSweetAlert()

  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    // formState: {
    //   errors
    // }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",

      transaction_no: "",
      series_no: "",

      category: "",
      date_harvest: null,

      farm: "",
      building: "",
      leadman: "",
      checker: "",
      buyer: "",
      plate_no: "",
      allowance: "",

      heads: "",
      weight: ""
    }
  })

  useEffect(() => {
    if (open) {
      setValue("id", data?.id)

      setValue("transaction_no", data?.transaction_no)
      setValue("series_no", data?.series_no.split("-").at(1))

      setValue("category", data?.category)
      setValue("date_harvest", data?.date_harvest)
      setValue("farm", data?.farm)
      setValue("building", data?.building)
      setValue("leadman", data?.leadman)
      setValue("checker", data?.checker)
      setValue("buyer", data?.buyer)
      setValue("plate_no", data?.plate_no)

      setValue("heads", data?.heads)
      setValue("weight", data?.weight)
    }
    // eslint-disable-next-line
  }, [open, data])

  const cancelUpdateHandler = () => {
    reset()
    onClose()
  }

  const submitUpdateHandler = (data) => {
    confirm({
      onConfirm: async () => {
        try {
          await updateTransaction(data).unwrap()

          toast({
            text: "Transaction has been updated."
          })
          cancelUpdateHandler()
        } catch (error) {
          console.log(error)
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
          name="transaction_no"
          label="Transaction No."
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="series_no"
          label="Series No."
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="category"
          label="Category"
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <DatePickerControlled
          control={control}
          name="date_harvest"
          renderInput={(params) => (
            <TextField {...params} label="Date Harvest" size="small" InputProps={{ disabled: true }} fullWidth />
          )}
          readOnly
        />

        <TextFieldControlled
          control={control}
          name="farm"
          label="Farm"
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="building"
          label="Building"
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="leadman"
          label="Leadman"
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="checker"
          label="Checker"
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="buyer"
          label="Buyer"
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="plate_no"
          label="Plate No."
          size="small"
          InputProps={{
            readOnly: true,
            disabled: true
          }}
        />

        <TextFieldControlled
          control={control}
          name="heads"
          label="Heads"
          size="small"
        />

        <TextFieldControlled
          control={control}
          name="weight"
          label="Weight"
          size="small"
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

  transaction_no: yup.string().required(),
  series_no: yup.string().required(),

  category: yup.string().required(),
  date_harvest: yup.date().required(),

  farm: yup.string().required(),
  building: yup.string().required(),
  leadman: yup.string().required(),
  checker: yup.string().required(),
  buyer: yup.string().required(),
  plate_no: yup.string().required(),

  heads: yup.number().required(),
  weight: yup.number().required()
})

export default UpdateTransaction