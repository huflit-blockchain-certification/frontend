import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { CustomModal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import useStudentsColumns from '@/hooks/User/useStudentColumns'
import RegisterUniversityForm from '@/components/Form/User/register.university.form'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES } from '@/constants/'
import { UniversityApi } from '@/pages/api/university.api'

export default function RecipientProfilePage() {
  const [cookies] = useCookies(['access_token'])

  const {
    listData,
    pagination,
    loading,
    rowSelectionModel,
    onFilterChange,
    handlePaginationModelChange,
    open,
    recordId,
    setRecordId,
    setOpen,
    crudOperation,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: UniversityApi.listUniversitys,
    deleteApi: UniversityApi.deleteUniversities,
  })
  const { columns } = useStudentsColumns({ setOpen, setRecordId })

  return (
    <TableLayout title={PLUGIN_NAMES.RECIPIENT_PROFILE.NAME} onCreateClick={() => setOpen(true)}>
      <Box sx={{ height: 700, width: '100%' }}>
        <CustomModal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <RegisterUniversityForm
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
          handlePaginationModelChange={handlePaginationModelChange}
          onFilterChange={onFilterChange}
          pagination={pagination}
        />
      </Box>
    </TableLayout>
  )
}

RecipientProfilePage.Layout = AdminLayout
