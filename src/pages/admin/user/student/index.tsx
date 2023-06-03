import { AdminLayout, TableLayout } from '@/layouts'
import Box from '@mui/material/Box'
import { useTableControl } from '@/hooks/common/useTableControl'
import { useCookies } from 'react-cookie'
import React from 'react'
import { Modal } from '@/components/common/Modal/modal.component'
import TableData from '@/components/common/Form/Table/table.component'
import useStudentsColumns from '@/hooks/useColumn/useStudentColumns'
import RegisterStudentForm from '@/components/Form/User/register.student.form'
import { afterActions } from '@/utils/afterActions.util'
import { PLUGIN_NAMES, STUDENT_ROLE, UNIVERSITY_ROLE } from '@/constants/'
import { MapData } from '@/utils/mapData.util'
import { StudentApi } from '@/pages/api/User/student.api'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import { useAuth } from '@/hooks/common/useAuth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
export interface UserTablePageProps {}

export default function StudentUserListPage({}: any) {
  const idKey = 'createdBy'
  const [cookies] = useCookies(['access_token'])
  const { roles } = useAuth()
  const {
    listData,
    pagination,
    loading,
    rowSelectionModel,
    handleRowSelection,
    onFilterChange,
    handlePaginationModelChange,
    open,
    recordId,
    setRecordId,
    setOpen,
    crudOperation,
    totalPage,
  } = useTableControl({
    accessToken: cookies.access_token,
    idKey,
    listingApi: roles?.includes(UNIVERSITY_ROLE)
      ? StudentApi.listStudentsOfUniversity
      : StudentApi.listStudents,
    deleteApi: StudentApi.deleteStudents,
  })
  const { columns } = useStudentsColumns({ setOpen, setRecordId })
  return (
    <TableLayout
      disabledOptions={{
        disableMainBtn: !isAllowAccess([UNIVERSITY_ROLE], roles),
      }}
      title={PLUGIN_NAMES.USERS.NAME}
      onCreateClick={() => setOpen(true)}
      enableDownloadCSV
      csv={[
        {
          titleCSV: 'Nhập tài khoản',
          enableCSV: isAllowAccess([UNIVERSITY_ROLE], roles),
          requestAfterConfirmCSV: async (data) =>
            await MapData.mapExcelData({
              data,
              requestFn: StudentApi.registerStudents,
              cookies: cookies.access_token,
              roles: [STUDENT_ROLE],
            }),
          afterImport: (data) => {
            crudOperation.create(data)
          },
        },
      ]}
    >
      <Box sx={{ height: 700, width: '100%' }}>
        <Modal beforeClose={() => setRecordId(undefined)} open={open} setOpen={setOpen}>
          <RegisterStudentForm
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

StudentUserListPage.Layout = AdminLayout
