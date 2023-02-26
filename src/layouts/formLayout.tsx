import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'
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
          <Link href="" className="flex gap-2 items-center text-blue-500">
            <HiArrowLeft />
            <div>Go back</div>
          </Link>
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
