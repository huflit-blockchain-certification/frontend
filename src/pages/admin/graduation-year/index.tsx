import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES } from '@/constants/'
import useGraduationYearColumn from '@/hooks/useColumn/useGraduationYearColum'
import { GraduationYearApi } from '@/pages/api/Graduation-Year/graduation-year.api'
import GraduationYearForm from '@/components/Form/Graduation-Year/graduation-year.form'

export default function CertTypeListPage() {
  const [cookies] = useCookies(['access_token'])

  const {
    listData,
    pagination,
    loading,
    rowSelectionModel,
    onFilterChange,
    handlePaginationModelChange,
    handleRowSelection,
    onDeleteRowClick,
    open,
    recordId,
    setRecordId,
    setOpen,
    crudOperation,
    totalPage,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: GraduationYearApi.listGraduationYear,
    deleteApi: GraduationYearApi.detailGraduationYear,
  })
  const { columns } = useGraduationYearColumn({ setOpen, setRecordId })

  return (
    <TableLayout title={PLUGIN_NAMES.GRADUAUATION_YEAR.NAME} onCreateClick={() => setOpen(true)}>
      <Box sx={{ height: 700, width: '100%' }}>
        <Modal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <GraduationYearForm
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
          handleRowSelection={handleRowSelection}
          handlePaginationModelChange={handlePaginationModelChange}
          onFilterChange={onFilterChange}
          pagination={pagination}
          onDeleteRowClick={onDeleteRowClick}
          totalPage={totalPage}
        />
      </Box>
    </TableLayout>
  )
}

CertTypeListPage.Layout = AdminLayout
