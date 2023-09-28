import moment from "moment"

import { Controller } from "react-hook-form"

import { DatePicker } from "@mui/x-date-pickers"

const DatePickerControlled = ({ name, control, ...params }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = null, onChange } = field

        return (
          <DatePicker
            {...params}
            value={value}
            onChange={(value) => {
              if (!moment(value).isValid()) return

              onChange(moment(value).format())
            }}
          />
        )
      }}
    />
  )
}

export default DatePickerControlled