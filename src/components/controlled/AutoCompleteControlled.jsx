import { Controller } from "react-hook-form"
import { Autocomplete as MuiAutocomplete } from "@mui/material"

const AutoCompleteControlled = ({ name, control, ...params }) => {
  const { multiple } = params

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value = multiple ? [] : null, onChange } = field

        return (
          <MuiAutocomplete
            {...params}
            value={value}
            onChange={(_, value) => onChange(value)}
          />
        )
      }}
    />
  )
}

export default AutoCompleteControlled