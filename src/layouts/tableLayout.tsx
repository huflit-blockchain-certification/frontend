import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import React from 'react'

interface TableLayoutProps {
  children: React.ReactNode
  title?: string
}

export function TableLayout({ title, children }: TableLayoutProps) {
  const router = useRouter()
  return (
    <>
      <div className="flex p-5">
        <div className="text-2xl font-bold">{title?.toUpperCase() + ' MANAGEMENT' || ''}</div>
        <Button
          className="ml-auto"
          type="submit"
          onClick={() => router.push(`/admin/${title}/create`)}
        >
          Create
        </Button>
      </div>
      {children}
    </>
  )
}
