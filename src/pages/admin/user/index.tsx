import TableData from '@/components/common/Form/Table/table'
import { AdminLayout, MainLayout, TableLayout } from '@/layouts'
import * as React from 'react'

export interface UserTablePageProps {}

export default function UserTablePage(props: UserTablePageProps) {
  return (
    <TableLayout title="user">
      <TableData />
    </TableLayout>
  )
}

UserTablePage.Layout = AdminLayout
