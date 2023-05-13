import React from 'react'
import { GoBack } from '@/components/common/Goback/goback.component'

interface SelectPageLayoutProps {
  title: string
  children: React.ReactNode
}

export function SelectPageLayout({ title, children }: SelectPageLayoutProps) {
  return (
    <>
      <div className="flex p-5">
        <div className="flex flex-col gap-3">
          <GoBack />
          <div className="text-2xl font-bold">{title.toUpperCase() || ''}</div>
        </div>
      </div>
      {children}
    </>
  )
}
