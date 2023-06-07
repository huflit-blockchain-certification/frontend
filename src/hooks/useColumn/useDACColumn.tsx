import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import * as React from 'react'
import { dateFormat } from '@/utils/formatter.util'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
}

export default function useDACColumns({ open, setOpen, setRecordId }: ColumnsProps) {
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'iSt',
      headerName: 'Mã học sinh',
      width: 150,
    },
    {
      field: 'iU',
      headerName: 'Mã trường',
      width: 150,
    },
    {
      field: 'studentName',
      headerName: 'Tên học sinh',
      width: 150,
    },
    {
      field: 'idNumber',
      headerName: 'Số vào sổ',
      width: 150,
    },
    {
      field: 'registrationNum',
      headerName: 'Số hiệu',
      width: 150,
    },
    {
      field: 'universityName',
      headerName: 'Trường',
      width: 150,
    },
    { field: 'year', headerName: 'Năm tốt nghiệp', width: 150 },

    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.value)}</div>,
    },
  ]
  return { columns }
}
