import React, { useEffect, useState } from 'react'
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
  baseInput: any
  setValue: (field: string, value: any) => void
}

export function RefInput({
  name,
  control,
  label,
  placeholder,
  required,
  fullWidth,
  disabled,
  onChangeOverried,
  baseInput,
  setValue,
  ...rest
}: DatePickerProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control })

  const [disable, setDisable] = useState(true)

  useEffect(() => {
    onChange(baseInput)
  }, [baseInput, onChange])

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
          disabled={disable}
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
