import TableData from '@/components/common/Form/Table/table.component'
import { AdminLayout, TableLayout } from '@/layouts'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

export interface RecipentProfileProps {}

export default function RecipentProfilePage(props: RecipentProfileProps) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=1`)
      const data = await res.json()
      setData(data.data)
      setLoading(false)
    })()
  }, [])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ]

  return (
    <>
      {!loading && (
        <TableLayout title="Hồ sơ người nhận" slug="recipient-profile">
          <TableData columns={columns} rows={data} />
        </TableLayout>
      )}
    </>
  )
}

RecipentProfilePage.Layout = AdminLayout
