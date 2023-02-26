import * as React from 'react'
import { useController, Control } from 'react-hook-form'

export interface RadioProps {
  name: string
  label?: string
  control: Control<any>
  ref?: React.RefObject<HTMLInputElement>
  required?: boolean
  type?: string
  options?: Array<any>
}

export default function Radio({ options, name, control, required, label }: RadioProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <>
      <label style={{ fontWeight: '500', fontSize: '12px' }}>
        {label} {required && <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>}
      </label>
      <div className="flex gap-2">
        {options &&
          options.map(({ label, value }, index) => (
            <>
              <div className="flex items-center" key={index}>
                <input
                  checked
                  type="radio"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {label}
                </label>
              </div>
            </>
          ))}
      </div>
      <div style={{ fontSize: '.875em', color: '#b02a37', width: '100%' }}>
        {error && error.message}
      </div>
    </>
  )
}
