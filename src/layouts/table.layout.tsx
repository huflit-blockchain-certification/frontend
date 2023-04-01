import { useRouter } from 'next/router'
import React from 'react'
import Button from '@mui/material/Button'
import { GoBack } from '@/components/common/Goback/goback.component'
import { CSVInput } from '@/components/common/Form/CSVInput/csvinput.component'
interface TableLayoutProps {
  children: React.ReactNode
  title?: string
  slug?: string
  onCreateClick?: () => void
  enableCSV?: boolean
  requestAfterConfirmCSV?: (data: any[]) => Promise<any>
}

export function TableLayout({
  title,
  children,
  slug,
  onCreateClick,
  enableCSV,
  requestAfterConfirmCSV,
}: TableLayoutProps) {
  const router = useRouter()
  return (
    <>
      <div className="flex p-5">
        <div className="flex flex-col gap-3">
          <GoBack />
          <div className="text-2xl font-bold">{title?.toUpperCase() || ''}</div>
        </div>
        <div className="ml-auto flex gap-3 h-9">
          {enableCSV && <CSVInput requestAfterConfirmCSV={requestAfterConfirmCSV} />}
          <Button
            variant="outlined"
            onClick={() => (onCreateClick ? onCreateClick() : router.push(`/admin/${slug}/create`))}
          >
            Tạo
          </Button>
        </div>
      </div>
      {children}
    </>
  )
}
