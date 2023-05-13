import { HiPencil } from 'react-icons/hi'
import * as React from 'react'
import { dateFormat } from '@/utils/formatter.util'
import { useTranslation } from 'next-i18next'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
}

export default function useCertTypeColumns({ open, setOpen, setRecordId }: ColumnsProps) {
  const { t } = useTranslation('common')
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'name',
      headerName: 'Tên',
      width: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 200,
      renderCell: (params: any) => <div>{t(params.value)}</div>,
    },
    {
      field: 'level',
      headerName: 'Cấp bậc',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.value)}</div>,
    },
    {
      headerName: 'Tùy chỉnh',
      renderCell: (params: any) => (
        <HiPencil
          className="text-xl cursor-pointer"
          onClick={() => {
            setOpen(true)
            setRecordId(params?.id)
          }}
        />
      ),
    },
  ]
  return { columns }
}
