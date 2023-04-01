import { HiPencil } from 'react-icons/hi'
import * as React from 'react'
import { dateFormat } from '@/utils/formatter.util'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
}

export default function useStudentsColumns({ open, setOpen, setRecordId }: ColumnsProps) {
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'identity',
      headerName: 'CMND',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Tên',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    { field: 'gender', headerName: 'Giới tính' },
    {
      field: 'nation',
      headerName: 'Quốc tịch',
      width: 150,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Ngày sinh',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.dateOfBirth)}</div>,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.createdAt)}</div>,
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
