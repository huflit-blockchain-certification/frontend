import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import TableData from '@/components/common/Form/Table/table.component'
import { PLUGIN_NAMES } from '@/constants/'
import useDACColumns from '@/hooks/useColumn/useDACColumn'
import { DacApi } from '@/pages/api/DAC/dac.api'

export interface DACUniPageProps {}

export default function DACUniPage(props: DACUniPageProps) {
  const idKey = 'identity'
  const [cookies] = useCookies(['access_token'])

  const {
    listData,
    pagination,
    loading,
    rowSelectionModel,
    onFilterChange,
    handlePaginationModelChange,
    setRecordId,
    setOpen,
    totalPage,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: DacApi.listAllDacByUni,
    idKey,
  })
  const { columns } = useDACColumns({ setOpen, setRecordId })

  return (
    <TableLayout
      title={PLUGIN_NAMES.DAC.NAME}
      onCreateClick={() => setOpen(true)}
      disabledOptions={{
        disableMainBtn: true,
      }}
    >
      <Box sx={{ height: 700, width: '100%' }}>
        <TableData
          columns={columns}
          listData={listData}
          loading={loading}
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

DACUniPage.Layout = AdminLayout
