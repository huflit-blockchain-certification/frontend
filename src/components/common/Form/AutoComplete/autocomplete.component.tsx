import {
  FormControl,
  FormHelperText,
  TextField,
  Autocomplete as AutoCompleteField,
} from '@mui/material'
import React, { useState } from 'react'
import { useController, Control, Controller } from 'react-hook-form'

export interface AutoCompleteProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  required?: boolean
  type?: string
  fullWidth?: boolean
  options: any[]
  handleChange?: (event: any) => void
  defaultValue?: any
  optionLabel?: string
  optionValue?: string
  size?: any
}

export function AutoComplete({
  name,
  control,
  label,
  handleChange,
  required,
  placeholder,
  fullWidth,
  options,
  defaultValue,
  size,
}: AutoCompleteProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control })
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <AutoCompleteField
              {...field}
              value={value}
              defaultValue={defaultValue}
              onChange={(e, newValue) => {
                if (newValue === null) newValue = ''
                handleChange ? handleChange : onChange(newValue?.value)
              }}
              inputValue={inputValue}
              onInputChange={(e, newInputValue) => {
                setInputValue(newInputValue)
              }}
              fullWidth={fullWidth && true}
              ref={ref}
              placeholder={placeholder ?? ''}
              size={size || 'medium'}
              options={options}
              isOptionEqualToValue={(option, value) => option.value === value}
              ListboxProps={{ sx: { maxHeight: 200 } }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  error={error && true}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />

            <FormHelperText style={{ color: '#d32f2f' }}>{error?.message}</FormHelperText>
          </FormControl>
        )}
      ></Controller>
    </>
  )
}
