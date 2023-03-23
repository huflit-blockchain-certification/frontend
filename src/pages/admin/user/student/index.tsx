import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useStudentTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { CustomModal } from '@/components/common/Modal/modal.component'
import { Button } from '@mui/material'
import { deleteStudents } from '@/pages/api/User/delete.user.api'
import { listStudents } from '@/pages/api/User/list.user'
import TableData from '@/components/common/Form/Table/table.component'
import useStudentsColumns from '@/hooks/User/useStudentColumns'
import RegisterStudentForm from '@/components/User/register.student.form'
export interface UserTablePageProps {}

export default function StudentUserListPage({}: any) {
  const [cookies] = useCookies(['access_token'])

  const {
    listData,
    pagination,
    loading,
    rowSelectionModel,
    handleRowSelection,
    onDeleteRowClick,
    onFilterChange,
    handlePaginationModelChange,
    open,
    recordId,
    setRecordId,
    setOpen,
  } = useStudentTableControl({
    accessToken: cookies.access_token,
    listingApi: listStudents,
    deleteApi: deleteStudents,
  })
  const { columns } = useStudentsColumns({ setOpen, setRecordId })

  return (
    <TableLayout title="Tài khoản" onCreateClick={() => setOpen(true)}>
      <Box sx={{ height: 700, width: '100%' }}>
        <CustomModal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <RegisterStudentForm recordId={recordId} setOpen={setOpen} />
        </CustomModal>
        {rowSelectionModel.length > 0 && (
          <Button variant="outlined" color="error" className="mb-2" onClick={onDeleteRowClick}>
            Delete
          </Button>
        )}
        <TableData
          columns={columns}
          listData={listData}
          loading={loading}
          rowSelectionModel={rowSelectionModel}
          handleRowSelection={handleRowSelection}
          handlePaginationModelChange={handlePaginationModelChange}
          onFilterChange={onFilterChange}
          pagination={pagination}
        />
      </Box>
    </TableLayout>
  )
}

StudentUserListPage.Layout = AdminLayout
