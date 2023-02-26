import * as React from 'react'
import { useController, Control } from 'react-hook-form'

export interface SelectProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  ref?: React.RefObject<HTMLInputElement>
  required?: boolean
  type?: string
  options?: Array<any>
}

export function Select({ name, control, label, required, options }: SelectProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })
  return (
    <>
      <label style={{ fontWeight: '500', fontSize: '12px' }}>
        {label} {required && <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
      dark:focus:border-blue-500"
      >
        {options &&
          options.map((option, index) => <option key={index} value={option?.value}></option>)}
      </select>
      <div style={{ fontSize: '.875em', color: '#b02a37', width: '100%' }}>
        {error && error.message}
      </div>
    </>
  )
}
