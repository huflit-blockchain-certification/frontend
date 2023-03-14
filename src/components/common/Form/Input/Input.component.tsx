import React from 'react'
import { useController, Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface DatePickerProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  required?: boolean
  type?: string
  fullWidth?: boolean
  disabled?: boolean
  onChangeOverried?: () => void
}

export function Input({
  name,
  control,
  label,
  placeholder,
  required,
  fullWidth,
  disabled,
  onChangeOverried,
  ...rest
}: DatePickerProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          error={error && true}
          label={label}
          value={value ?? ''}
          onChange={(e: any) => {
            onChangeOverried ? onChangeOverried() : onChange(e.target.value)
          }}
          ref={ref}
          placeholder={placeholder ?? ''}
          helperText={error && error.message}
          fullWidth={fullWidth && true}
          {...rest}
        />
      )}
    />
  )
}
