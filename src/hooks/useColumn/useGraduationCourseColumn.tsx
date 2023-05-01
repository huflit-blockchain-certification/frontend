import { HiPencil } from 'react-icons/hi'
import * as React from 'react'
import { dateFormat } from '@/utils/formatter.util'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
}

export default function useGraduationCourseColumn({ open, setOpen, setRecordId }: ColumnsProps) {
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'name',
      headerName: 'Tên',
      width: 200,
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.value)}</div>,
    },
    {
      field: 'endDate',
      headerName: 'Ngày kết thúc',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.value)}</div>,
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
