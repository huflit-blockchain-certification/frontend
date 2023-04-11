import { HiPencil } from 'react-icons/hi'
import * as React from 'react'
import { dateFormat } from '@/utils/formatter.util'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
}

export default function useRecipientProfile({ open, setOpen, setRecordId }: ColumnsProps) {
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    // { field: 'id', headerName: 'Mã hồ sơ', width: 150 },
    {
      field: 'iU',
      headerName: 'Mã học sinh',
      width: 150,
    },
    {
      field: 'studentName',
      headerName: 'Tên học sinh',
      width: 150,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 150,
    },
    {
      field: 'ranking',
      headerName: 'Xếp loại',
      width: 150,
    },
    {
      field: 'iU',
      headerName: 'Mã trường',
      width: 150,
    },
    {
      field: 'universityName',
      headerName: 'Trường',
      width: 150,
    },
    { field: 'nameCourse', headerName: 'Khóa', width: 150 },
    { field: 'year', headerName: 'Năm tốt nghiệp', width: 150 },
    { field: 'departmentName', headerName: 'Khoa', width: 150 },
    { field: 'major', headerName: 'Ngành', width: 150 },
    {
      field: 'nation',
      headerName: 'Dân tộc',
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
