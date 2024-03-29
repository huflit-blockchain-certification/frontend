import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES } from '@/constants/'
import CertTypeForm from '@/components/Form/Cert-Type/cert-type.form'
import { CertTypeApi } from '@/pages/api/Cert-Type/cert-type.api'
import useCertTypeColumns from '@/hooks/useColumn/useCertTypeColumn'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

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
    listingApi: CertTypeApi.listCertType,
    deleteApi: CertTypeApi.deleteCertType,
  })
  const { columns } = useCertTypeColumns({ setOpen, setRecordId })

  return (
    <TableLayout title={PLUGIN_NAMES.CERT_TYPE.NAME} onCreateClick={() => setOpen(true)}>
      <Box sx={{ height: 700, width: '100%' }}>
        <Modal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <CertTypeForm
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'vi', ['common'])),
    },
  }
}

CertTypeListPage.Layout = AdminLayout
