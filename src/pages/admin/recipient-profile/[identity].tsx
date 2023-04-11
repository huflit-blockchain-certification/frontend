import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import useStudentsColumns from '@/hooks/useColumn/useStudentColumns'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES } from '@/constants/'
import { RecipientProfileApi } from '@/pages/api/Recipient-Profile/recipient-profle.api'
import RecipientProfileForm from '@/components/Form/Recipient-Profile/recipient-profile.form'
import useRecipientProfile from '@/hooks/useColumn/useRecipientProfile'

export default function RecipientProfilePage() {
  const idKey = 'identity'
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
    idParam,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: RecipientProfileApi.listRecipientProfile,
    deleteApi: RecipientProfileApi.deleteRecipientProfile,
    idKey,
  })
  const { columns } = useRecipientProfile({ setOpen, setRecordId })

  return (
    <TableLayout
      title={PLUGIN_NAMES.RECIPIENT_PROFILE.NAME}
      onCreateClick={() => setOpen(true)}
      csv={[
        {
          enableCSV: true,
          titleCSV: 'Nhập hồ sơ',
          requestAfterConfirmCSV: async (data) =>
            await RecipientProfileApi.createRecipientProfile({
              data,
              accessToken: cookies.access_token,
              idParam,
            }),
        },
        {
          enableCSV: true,
          titleCSV: 'Nhập số hiệu',
          requestAfterConfirmCSV: async (data) =>
            await RecipientProfileApi.createRegistrationNumber({
              data,
              accessToken: cookies.access_token,
              idParam,
            }),
        },
        {
          enableCSV: true,
          titleCSV: 'Nhập số vào sổ',
          requestAfterConfirmCSV: async (data) =>
            await RecipientProfileApi.createIdNumber({
              data,
              accessToken: cookies.access_token,
              idParam,
            }),
        },
      ]}
    >
      <Box sx={{ height: 700, width: '100%' }}>
        <Modal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <RecipientProfileForm
            recordId={recordId}
            setOpen={setOpen}
            afterActions={afterActions(crudOperation)}
            idParam={idParam}
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

RecipientProfilePage.Layout = AdminLayout
