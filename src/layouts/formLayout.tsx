import { GoBack } from '@/components/common/Goback/goback'
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
      <GoBack />
      {!disableHeader && (
        <div className="flex p-5">
          {customActions ? customActions : <div className="ml-auto">Lưu</div>}
        </div>
      )}
      <div className={className ?? ''}>{children}</div>
    </form>
  )
}
