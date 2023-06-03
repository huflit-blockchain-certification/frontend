import { useRouter } from 'next/router'
import React from 'react'
import Button from '@mui/material/Button'
import { GoBack } from '@/components/common/Goback/goback.component'
import { CSVInput } from '@/components/common/Form/CSVInput/csvinput.component'
import { Download } from '@/components/common/Download/download.component'
interface CSV {
  enableCSV?: boolean
  requestAfterConfirmCSV?: (data: any[]) => Promise<any>
  afterImport?: (data: any) => void
  titleCSV?: string
}
interface DisabledOptions {
  disableMainBtn?: boolean
}
interface TableLayoutProps {
  children: React.ReactNode
  title?: string
  slug?: string
  onCreateClick?: () => void
  csv?: CSV[]
  additionalButtons?: React.ReactNode
  enableDownloadCSV?: boolean
  disabledOptions?: DisabledOptions
}

export function TableLayout({
  title,
  children,
  slug,
  onCreateClick,
  csv,
  additionalButtons,
  disabledOptions,
  enableDownloadCSV,
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
          {enableDownloadCSV && (
            <Download title="Tải biểu mẫu" fileName="BieuMau.csv" filePath="/BieuMau.xlsx" />
          )}
          {csv &&
            csv.length > 0 &&
            csv.map((c, index) => {
              if (!c.enableCSV) return
              return (
                <CSVInput
                  titleCSV={c?.titleCSV}
                  requestAfterConfirmCSV={c.requestAfterConfirmCSV}
                  afterImport={c.afterImport}
                  key={index}
                />
              )
            })}

          {additionalButtons && additionalButtons}
          {!disabledOptions?.disableMainBtn && (
            <Button
              variant="outlined"
              onClick={() =>
                onCreateClick ? onCreateClick() : router.push(`/admin/${slug}/create`)
              }
            >
              Tạo
            </Button>
          )}
        </div>
      </div>
      {children}
    </>
  )
}
