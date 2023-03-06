import React from 'react'
import { useController, Control } from 'react-hook-form'
import TextField from '@mui/material/TextField'

interface DatePickerProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  required?: boolean
  type?: string
  fullWidth?: boolean
}

export function Input({
  name,
  control,
  label,
  placeholder,
  required,
  fullWidth,
  ...rest
}: DatePickerProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <TextField
      error={error && true}
      label={label}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      ref={ref}
      name={name}
      placeholder={placeholder ?? ''}
      helperText={error && error.message}
      fullWidth={fullWidth && true}
      {...rest}
    />
  )
}
