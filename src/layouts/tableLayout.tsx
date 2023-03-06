import { useRouter } from 'next/router'
import React from 'react'
import Button from '@mui/material/Button'
interface TableLayoutProps {
  children: React.ReactNode
  title?: string
  slug: string
}

export function TableLayout({ title, children, slug }: TableLayoutProps) {
  const router = useRouter()
  return (
    <>
      <div className="flex p-5">
        <div className="text-2xl font-bold">{title?.toUpperCase() || ''}</div>
        <Button
          variant="outlined"
          className="ml-auto"
          onClick={() => router.push(`/admin/${slug}/create`)}
        >
          Tạo
        </Button>
      </div>
      {children}
    </>
  )
}
