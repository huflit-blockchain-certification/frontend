import { Toast } from '@/components/common/Toast/response.component'
import { GridFilterModel, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

interface useTableControlProps {
  accessToken: string
  listingApi: (page: number, keyword: string, accessToken: string) => Promise<any>
  deleteApi: (row: any, accessToken: string) => Promise<[]>
}
export function useStudentTableControl({
  accessToken,
  listingApi,
  deleteApi,
}: useTableControlProps) {
  const [recordId, setRecordId] = useState()
  const [open, setOpen] = useState(false)
  const [listData, setListData] = useState<any>({})
  const [pagination, setPagination] = useState<GridPaginationModel>({ page: 1, pageSize: 10 })
  const [loading, setLoading] = useState(false)
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])
  const [queryOptions, setQueryOptions] = useState<any>({})

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    setQueryOptions({ filterModel: { ...filterModel } })
  }, [])
  const handleRowSelection = useCallback((newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel)
  }, [])

  const handlePaginationModelChange = useCallback(
    (newModel: GridPaginationModel) => {
      setPagination({ ...newModel, page: newModel.page + 1 })
    },
    [setPagination]
  )

  const onDeleteRowClick = async () => {
    try {
      await Promise.all(rowSelectionModel.map((row) => deleteApi(row, accessToken)))
      setListData(listData.filter((item: string | number) => rowSelectionModel.includes(item)))
    } catch (err: any) {
      Toast.fire({ title: 'Something went wrong', icon: 'error' })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const keyword = queryOptions?.filterModel?.quickFilterValues?.[0]
        const listData = await listingApi(pagination.page, keyword, accessToken)
        if (!listData) {
          throw new Error('Something went wrong')
        }
        setListData(listData.data.data)
        setPagination({
          page: listData.data.pagination.page,
          pageSize: listData.data.pagination.limit,
        })
        setLoading(false)
      } catch (err: any) {
        Toast.fire({ title: err.message, icon: 'error' })
      }
    })()
  }, [accessToken, pagination?.page, queryOptions, listingApi])
  return {
    listData,
    pagination,
    loading,
    setLoading,
    handleRowSelection,
    rowSelectionModel,
    onDeleteRowClick,
    onFilterChange,
    handlePaginationModelChange,
    open,
    setOpen,
    recordId,
    setRecordId,
  }
}
