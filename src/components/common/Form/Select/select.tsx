import { MenuItem } from '@mui/material'
import { Select as SelectField } from '@mui/material'
import * as React from 'react'
import { useController, Control, Controller } from 'react-hook-form'

export interface SelectProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  required?: boolean
  type?: string
  fullWidth?: boolean
  options?: any[]
  handleChange?: (event: any) => void
  defaultValue?: any
}

export function Select({
  name,
  control,
  label,
  handleChange,
  required,
  placeholder,
  fullWidth,
  options,
  defaultValue,
}: SelectProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control })
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            value={value}
            defaultValue={defaultValue}
            label={label}
            onChange={(e) => (handleChange ? handleChange : onChange(e.target.value))}
            error={error && true}
            fullWidth={fullWidth && true}
            ref={ref}
            placeholder={placeholder ?? ''}
          >
            {options &&
              options.map((option, index) => (
                <MenuItem key={index} value={option?.value}>
                  {option.label}
                </MenuItem>
              ))}
          </SelectField>
        )}
      ></Controller>
    </>
  )
}
