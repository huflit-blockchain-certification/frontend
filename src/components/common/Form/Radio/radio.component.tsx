import { FormControlLabel, RadioGroup, Radio as RadioField } from '@mui/material'
import * as React from 'react'
import { useController, Control, Controller } from 'react-hook-form'

export interface RadioProps {
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

export default function Radio({
  options,
  name,
  control,
  required,
  label,
  handleChange,
  ...rest
}: RadioProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          {...field}
          row
          value={value}
          onChange={(e) => (handleChange ? handleChange : onChange(e.target.value))}
          {...rest}
        >
          {options &&
            options.map(({ label, value }, index) => (
              <FormControlLabel
                key={index}
                value={value}
                label={label}
                control={<RadioField size="small" />}
              />
            ))}
        </RadioGroup>
      )}
    />
  )
}
