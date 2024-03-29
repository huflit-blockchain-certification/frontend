import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import { afterActions } from '@/utils/afterActions.util'
import { DOET_ROLE, PLUGIN_NAMES, UNIVERSITY_ROLE } from '@/constants/'
import { RecipientProfileApi } from '@/pages/api/Recipient-Profile/recipient-profle.api'
import RecipientProfileForm from '@/components/Form/Recipient-Profile/recipient-profile.form'
import useRecipientProfileColumn from '@/hooks/useColumn/useRecipientProfileColumn'
import IssueModal from '@/components/Form/IssueModal/issue-modal.component'
import { useForm } from 'react-hook-form'
import { Select } from '@/components/common/Form/Select/select.component'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import { useAuth } from '@/hooks/common/useAuth'
import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { MapData } from '@/utils/mapData.util'

export default function RecipientProfilePage() {
  const idKey = 'identity'
  const [cookies] = useCookies(['access_token'])
  const { roles } = useAuth()
  const { control, watch } = useForm({
    defaultValues: { idNumber: false, registrationNumber: false },
  })
  const {
    listData,
    setListData,
    pagination,
    loading,
    rowSelectionModel,
    onFilterChange,
    handlePaginationModelChange,
    open,
    recordId,
    setRecordId,
    onDeleteRowClick,
    handleRowSelection,
    setOpen,
    crudOperation,
    idParam,
    totalPage,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: RecipientProfileApi.listRecipientProfile,
    deleteApi: RecipientProfileApi.deleteRecipientProfile,
    extraInfo: {
      extraParams: watch(),
    },
    idKey,
  })
  const { columns } = useRecipientProfileColumn({
    setOpen,
    setRecordId,
    idParam,
    crudOperation,
  })

  return (
    <TableLayout
      title={PLUGIN_NAMES.RECIPIENT_PROFILE.NAME}
      onCreateClick={() => setOpen(true)}
      disabledOptions={{ disableMainBtn: !isAllowAccess([UNIVERSITY_ROLE], roles) }}
      enableDownloadCSV
      csv={[
        {
          enableCSV: isAllowAccess([UNIVERSITY_ROLE], roles),
          titleCSV: 'Nhập hồ sơ',
          requestAfterConfirmCSV: async (data) =>
            await MapData.mapExcelData({
              data,
              requestFn: RecipientProfileApi.createRecipientProfile,
              cookies: cookies.access_token,
              idParam,
            }),
          afterImport(data) {
            crudOperation.create(data)
          },
        },
        {
          enableCSV: isAllowAccess([DOET_ROLE], roles),
          titleCSV: 'Nhập số hiệu',
          requestAfterConfirmCSV: async (data) =>
            await MapData.mapExcelData({
              data,
              requestFn: RecipientProfileApi.createRegistrationNumber,
              cookies: cookies.access_token,
              idParam,
              useAlternativeKey: true,
            }),
          afterImport(data) {
            crudOperation.edit(data)
          },
        },
        {
          enableCSV: isAllowAccess([UNIVERSITY_ROLE], roles),
          titleCSV: 'Nhập số vào sổ',
          requestAfterConfirmCSV: async (data) =>
            await MapData.mapExcelData({
              data,
              requestFn: RecipientProfileApi.createIDNumber,
              cookies: cookies.access_token,
              idParam,
              useAlternativeKey: true,
            }),
          afterImport(data) {
            crudOperation.edit(data)
          },
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
        <div className="flex gap-2 w-1/2">
          <Select
            control={control}
            defaultValue={false}
            label="Số vào sổ"
            name="idNumber"
            options={[
              { value: true, label: 'Đã nhập' },
              { value: false, label: 'Chưa nhập' },
            ]}
          />
          <Select
            control={control}
            defaultValue={false}
            label="Số hiệu"
            name="registrationNumber"
            options={[
              { value: true, label: 'Đã nhập' },
              { value: false, label: 'Chưa nhập' },
            ]}
          />
        </div>
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
          totalPage={totalPage}
          IssueModal={
            <IssueModal
              rowSelectionModel={rowSelectionModel}
              accessToken={cookies.access_token}
              idParam={idParam}
              afterIssue={(response: any) => {
                try {
                  const mappedResponsed = response?.data?.data?.map((res: any) => res._id)
                  setListData(listData.filter((item: any) => !mappedResponsed.includes(item._id)))
                  successMessage('Cấp bằng')
                  setOpen(false)
                } catch (err: any) {
                  errorMessage(err.message)
                }
              }}
            />
          }
        />
      </Box>
    </TableLayout>
  )
}

RecipientProfilePage.Layout = AdminLayout
