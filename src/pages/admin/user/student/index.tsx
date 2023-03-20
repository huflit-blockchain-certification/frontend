import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { DataGrid, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'
import { useStudentTableControl } from '@/hooks/User/useStudentTableControl'
import { useCookies } from 'react-cookie'
import React, { useState } from 'react'
import { CustomModal } from '@/components/common/Modal/modal.component'
import RegisterStudentForm from '@/components/User/register.student.form'
import { HiEye } from 'react-icons/hi'
import { Button } from '@mui/material'
export interface UserTablePageProps {}

export default function StudentUserListPage() {
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
    { field: 'createdAt', headerName: 'Ngày tạo', width: 200 },
    {
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
  const [cookies] = useCookies(['access_token'])
  const [recordId, setRecordId] = useState()
  const [open, setOpen] = useState(false)
  const {
    listUsers,
    pagination,
    setPagination,
    loading,
    rowSelectionModel,
    handleRowSelection,
    onDeleteRowClick,
  } = useStudentTableControl(cookies.access_token)
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPagination({ ...newModel, page: newModel.page + 1 })
  }

  return (
    <TableLayout title="Tài khoản" onCreateClick={() => setOpen(true)}>
      <Box sx={{ height: 700, width: '100%' }}>
        <CustomModal open={open} setOpen={setOpen}>
          <RegisterStudentForm recordId={recordId} setOpen={setOpen} />
        </CustomModal>
        {rowSelectionModel.length > 0 && (
          <Button variant="outlined" color="error" className="mb-2" onClick={onDeleteRowClick}>
            Delete
          </Button>
        )}
        <DataGrid
          rows={listUsers ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={20}
          loading={loading}
          keepNonExistentRowsSelected
          paginationMode="server"
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={handleRowSelection}
          onPaginationModelChange={handlePaginationModelChange}
          paginationModel={{ ...pagination, page: pagination?.page - 1 }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </TableLayout>
  )
}

StudentUserListPage.Layout = AdminLayout
