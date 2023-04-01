import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { CustomModal } from '@/components/common/Modal/modal.component'
import { deleteStudents } from '@/pages/api/User/delete.user.api'
import { listStudents } from '@/pages/api/User/list.user'
import TableData from '@/components/common/Form/Table/table.component'
import useStudentsColumns from '@/hooks/User/useStudentColumns'
import RegisterStudentForm from '@/components/User/register.student.form'
import { registerStudents } from '@/pages/api/User/register.user.api'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES } from '@/constants'
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
    crudOperation,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: listStudents,
    deleteApi: deleteStudents,
  })
  const { columns } = useStudentsColumns({ setOpen, setRecordId })

  const requestAfterConfirmCSV = async (data: any[]) => {
    if (!data?.length) return
    const mappedData = data.map((record) => {
      const roles = record?.roles
      if (roles && !Array.isArray(roles)) {
        record.roles = [roles]
      }
      return record
    })
    const response = await registerStudents(mappedData, cookies.access_token)
    return response
  }

  return (
    <TableLayout
      title={PLUGIN_NAMES.USERS}
      onCreateClick={() => setOpen(true)}
      enableCSV
      requestAfterConfirmCSV={requestAfterConfirmCSV}
    >
      <Box sx={{ height: 700, width: '100%' }}>
        <CustomModal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <RegisterStudentForm
            recordId={recordId}
            setOpen={setOpen}
            afterActions={afterActions(crudOperation)}
          />
        </CustomModal>
        <TableData
          columns={columns}
          listData={listData}
          loading={loading}
          rowSelectionModel={rowSelectionModel}
          handleRowSelection={handleRowSelection}
          handlePaginationModelChange={handlePaginationModelChange}
          onFilterChange={onFilterChange}
          pagination={pagination}
          onDeleteRowClick={onDeleteRowClick}
        />
      </Box>
    </TableLayout>
  )
}

StudentUserListPage.Layout = AdminLayout
