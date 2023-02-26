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

export function DatePicker({ name, control, label, placeholder, required, ref }: DatePickerProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <>
      <label style={{ fontWeight: '500', fontSize: '12px' }}>
        {label} {required && <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>}
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>

        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          ref={ref}
          name={name}
          placeholder={placeholder ?? ''}
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div style={{ fontSize: '.875em', color: '#b02a37', width: '100%' }}>
        {error && error.message}
      </div>
    </>
  )
}
