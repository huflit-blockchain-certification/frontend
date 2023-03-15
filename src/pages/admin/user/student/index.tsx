import { AdminLayout, TableLayout } from '@/layouts'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridPaginationModel, GridValueGetterParams } from '@mui/x-data-grid'
import { useFetchStudentListUser } from '@/hooks/User/useFetchStudentListUser'
import { useCookies } from 'react-cookie'

export interface UserTablePageProps {}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID' },
  {
    field: 'identity',
    headerName: 'CMND',
  },
  {
    field: 'name',
    headerName: 'Tên',
    // valueGetter: (params: GridValueGetterParams) => `${params.row.roles || ''} `,
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  { field: 'gender', headerName: 'Giới tính' },
  { field: 'createdAt', headerName: 'Ngày tạo' },
]

export default function StudentUserListPage() {
  const [cookies] = useCookies(['access_token'])
  const { listUsers, pagination, setPagination, loading } = useFetchStudentListUser(
    cookies.access_token
  )
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    console.log(newModel)
    setPagination(newModel)
  }
  return (
    <TableLayout title="Tài khoản" slug="/user/student">
      <Box sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={listUsers ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={20}
          loading={loading}
          paginationMode="server"
          paginationModel={pagination}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </TableLayout>
  )
}

StudentUserListPage.Layout = AdminLayout
