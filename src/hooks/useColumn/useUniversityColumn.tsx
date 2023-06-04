import { HiEye } from 'react-icons/hi'
import * as React from 'react'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
}

export default function useUniversityColumns({ open, setOpen, setRecordId }: ColumnsProps) {
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'identity',
      headerName: 'Mã định danh',
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
    { field: 'createdAt', headerName: 'Ngày tạo', width: 200 },
    {
      headerName: 'Tùy chỉnh',
      renderCell: (params: any) => (
        <HiEye
          className="text-xl cursor-pointer"
          onClick={() => {
            setOpen(true)
            setRecordId(params.id)
          }}
        />
      ),
    },
  ]
  return { columns }
}
