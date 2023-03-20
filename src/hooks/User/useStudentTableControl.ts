import { Toast } from '@/components/common/Toast/response.component'
import { deleteStudents } from '@/pages/api/User/delete.user.api'
import { listStudents } from '@/pages/api/User/list.user'
import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

export function useStudentTableControl(accessToken: string) {
  const [listUsers, setListUsers] = useState<any>({})
  const [pagination, setPagination] = useState<GridPaginationModel>({ page: 1, pageSize: 10 })
  const [loading, setLoading] = useState(false)
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])

  const handleRowSelection = (newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel)
  }
  const onDeleteRowClick = async () => {
    try {
      alert()
      await Promise.all(rowSelectionModel.map((row) => deleteStudents(row, accessToken)))
      setListUsers(listUsers.filter((item: string | number) => rowSelectionModel.includes(item)))
    } catch (err: any) {
      console.log(err.mesasge)
      Toast.fire({ title: 'Something went wrong', icon: 'error' })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const listUsers = await listStudents(pagination.page, accessToken)
        if (!listUsers) {
          throw new Error('Something went wrong')
        }
        setListUsers(listUsers.data.data)
        setPagination({
          page: listUsers.data.pagination.page,
          pageSize: listUsers.data.pagination.limit,
        })
        setLoading(false)
      } catch (err: any) {
        Toast.fire({ title: err.message, icon: 'error' })
      }
    })()
  }, [accessToken, pagination.page])
  return {
    listUsers,
    pagination,
    setPagination,
    loading,
    setLoading,
    handleRowSelection,
    rowSelectionModel,
    onDeleteRowClick,
  }
}
