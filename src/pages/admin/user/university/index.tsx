import { AdminLayout, TableLayout } from '@/layouts'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useStudentTableControl } from '@/hooks/User/useStudentTableControl'
import { useCookies } from 'react-cookie'
import { useFetchUniversityListUser } from '@/hooks/User/useFetchUniversityListUser'

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
  const { listUsers, pagination } = useFetchUniversityListUser(cookies.access_token)
  return (
    <TableLayout title="Tài khoản" slug="/user/university">
      <Box sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={listUsers ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                page: pagination?.page || 1,
                pageSize: pagination?.limit || 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </TableLayout>
  )
}

StudentUserListPage.Layout = AdminLayout
