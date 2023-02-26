import React from 'react'

interface MultipleFormProps {
  children: React.ReactNode
  className?: string
}

export function MultipleFormLayout({ children, className }: MultipleFormProps) {
  return (
    <form>
      <div
        className={`flex flex-col gap-2 shadow rounded-lg p-10 w-full hover:shadow-lg transition-all ${
          className ?? ''
        }`}
      >
        {children}
      </div>
    </form>
  )
}
