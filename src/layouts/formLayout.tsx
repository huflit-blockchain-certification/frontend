import { Button } from 'flowbite-react'
import React from 'react'
interface FormProps {
  children: React.ReactNode
  customActions?: React.ReactNode
  disableHeader?: boolean
  onSubmit?: () => void
  className?: string
}

export function FormLayout({
  children,
  customActions,
  onSubmit,
  disableHeader,
  className,
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {!disableHeader && (
        <div className="flex p-5">
          {customActions ? (
            customActions
          ) : (
            <Button className="ml-auto" type="submit">
              Save
            </Button>
          )}
        </div>
      )}
      <div className={className ?? ''}>{children}</div>
    </form>
  )
}
