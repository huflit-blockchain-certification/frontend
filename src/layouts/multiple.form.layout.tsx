import React from 'react'

interface FormLayoutsProps {
  children: React.ReactNode
  className?: string
}

export function FormLayout({ children, className }: FormLayoutsProps) {
  return (
    <form>
      <div className={`flex flex-col gap-2 ${className ?? ''}`}>{children}</div>
    </form>
  )
}
