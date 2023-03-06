import TableData from '@/components/common/Form/Table/table'
import { AdminLayout, TableLayout } from '@/layouts'
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

  const columns = [
    {
      title: 'Mã hồ sơ',
      dataIndex: 'id',
    },
    { title: 'Họ và tên', dataIndex: 'title' },
    { title: 'Kì thi', dataIndex: '' },
    { title: 'Năm tốt nghiệp', dataIndex: '' },
    { title: 'Khóa tốt nghiệp', dataIndex: '' },
    { title: 'Hội đồng thi', dataIndex: '' },
    { title: 'Người nhận văn bằng', dataIndex: '' },
    { title: 'Số hiệu vào bảng', dataIndex: '' },
    { title: 'Số vào sổ', dataIndex: '' },
  ]
  return (
    <>
      {!loading && (
        <TableLayout title="Hồ sơ người nhận" slug="recipient-profile">
          <TableData columns={columns} data={data} />
        </TableLayout>
      )}
    </>
  )
}

RecipentProfilePage.Layout = AdminLayout
