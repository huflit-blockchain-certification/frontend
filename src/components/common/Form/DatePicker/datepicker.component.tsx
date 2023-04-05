import moment from 'moment'
import React from 'react'
import { useController, Control, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker as DatePickField } from '@mui/x-date-pickers/DatePicker'

interface DatePickerProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  required?: boolean
  type?: string
  fullWidth?: boolean
  format?: string
  views?: any[]
}

export function DatePicker({
  name,
  control,
  label,
  placeholder,
  required,
  fullWidth,
  format,
  views,
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePickField
            {...field}
            views={views && views}
            label={label}
            value={moment(value)}
            format={format ? format : 'DD-MM-YYYY'}
            onChange={(e) => {
              onChange(e)
            }}
            slotProps={{
              textField: {
                helperText: error && error.message,
                placeholder: placeholder ?? '',
                ref,
                error: error && true,
                fullWidth: fullWidth && true,
                ...rest,
              },
            }}
          />
        </LocalizationProvider>
      )}
    ></Controller>
  )
}
