import { TextInput } from 'flowbite-react'
import React from 'react'
import { useController, Control } from 'react-hook-form'

interface DatePickerProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  ref?: React.RefObject<HTMLInputElement>
  required?: boolean
  type?: string
}

export function Input({
  name,
  control,
  label,
  placeholder,
  required,
  ref,
  ...rest
}: DatePickerProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div>
      <label style={{ fontWeight: '500', fontSize: '12px' }}>
        {label} {required && <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>}
      </label>
      <TextInput
        color={error && 'failure'}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        ref={ref}
        name={name}
        placeholder={placeholder ?? ''}
        {...rest}
      />
      <div style={{ fontSize: '.875em', color: '#b02a37', width: '100%' }}>
        {error && error.message}
      </div>
    </div>
  )
}
