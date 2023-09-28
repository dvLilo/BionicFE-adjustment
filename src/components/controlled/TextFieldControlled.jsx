import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"

const TextFieldControlled = ({ name, control, ...params }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, value, onChange } = field

        return (
          <TextField
            {...params}
            inputRef={ref}
            value={value}
            onChange={onChange}
          />
        )
      }}
    />
  )
}

export default TextFieldControlled