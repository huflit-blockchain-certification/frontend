import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import RegisterUniversityForm from '@/components/Form/User/register.university.form'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES } from '@/constants/'
import { mapUserData } from '@/utils/mapData.util'
import { UniversityApi } from '@/pages/api/User/university.api'
import useUniversityColumns from '@/hooks/useColumn/useUniversityColumn'
export default function UniversityUserListPage() {
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
  const { columns } = useUniversityColumns({ setOpen, setRecordId })

  return (
    <TableLayout
      title={PLUGIN_NAMES.USERS.NAME}
      onCreateClick={() => setOpen(true)}
      enableCSV
      requestAfterConfirmCSV={(data) =>
        mapUserData(data, UniversityApi.registerUniversities, cookies.access_token)
      }
    >
      <Box sx={{ height: 700, width: '100%' }}>
        <Modal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <RegisterUniversityForm
            recordId={recordId}
            setOpen={setOpen}
            afterActions={afterActions(crudOperation)}
          />
        </Modal>
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

UniversityUserListPage.Layout = AdminLayout
