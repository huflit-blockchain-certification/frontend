import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import RegisterUniversityForm from '@/components/Form/User/register.university.form'
import { afterActions } from '@/utils/afterActions.util'
import { DOET_ROLE, PLUGIN_NAMES, UNIVERSITY_ROLE } from '@/constants/'
import { MapData } from '@/utils/mapData.util'
import { UniversityApi } from '@/pages/api/User/university.api'
import useUniversityColumns from '@/hooks/useColumn/useUniversityColumn'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import { useAuth } from '@/hooks/common/useAuth'
export default function UniversityUserListPage() {
  const [cookies] = useCookies(['access_token'])

  const {
    listData,
    pagination,
    loading,
    rowSelectionModel,
    onFilterChange,
    handlePaginationModelChange,
    handleRowSelection,
    open,
    recordId,
    setRecordId,
    setOpen,
    crudOperation,
    totalPage,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: UniversityApi.listUniversitys,
  })
  const { columns } = useUniversityColumns({ setOpen, setRecordId })
  const { roles } = useAuth()

  return (
    <TableLayout
      title={PLUGIN_NAMES.USERS.NAME}
      onCreateClick={() => setOpen(true)}
      disabledOptions={{
        disableMainBtn: !isAllowAccess([DOET_ROLE], roles),
      }}
      enableDownloadCSV
      csv={[
        {
          titleCSV: 'Nhập tài khoản',
          enableCSV: isAllowAccess([DOET_ROLE], roles),
          requestAfterConfirmCSV: async (data) =>
            await MapData.mapExcelData({
              data,
              requestFn: UniversityApi.registerUniversities,
              cookies: cookies.access_token,
              roles: [UNIVERSITY_ROLE],
            }),
          afterImport: (data) => {
            crudOperation.create(data)
          },
        },
      ]}
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
          handleRowSelection={handleRowSelection}
          rowSelectionModel={rowSelectionModel}
          handlePaginationModelChange={handlePaginationModelChange}
          onFilterChange={onFilterChange}
          pagination={pagination}
          totalPage={totalPage}
        />
      </Box>
    </TableLayout>
  )
}

UniversityUserListPage.Layout = AdminLayout
