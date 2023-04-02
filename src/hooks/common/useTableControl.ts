import { Toast } from '@/components/common/Toast/response.component'
import { ERROR_MESSAGE } from '@/constants'
import { GridFilterModel, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'

interface useTableControlProps {
  accessToken: string
  listingApi: (page: number, accessToken: string, keyword?: string) => Promise<any>
  deleteApi: (row: any, accessToken: string) => Promise<[]>
}

export function useTableControl({ accessToken, listingApi, deleteApi }: useTableControlProps) {
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
      Toast.fire({ title: ERROR_MESSAGE, icon: 'error' })
    }
  }

  const crudOperation = {
    create: (response: any) => {
      if (!response || !response?.data?.data) return
      setListData([...listData, response.data.data])
    },
    edit: (response: any) => {
      if (!response || !response?.data?.data) return
      setListData(
        listData.map((item: any) => {
          if (item?.id === response?.id) {
            item = response.data.data
          }
          return item
        })
      )
    },
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const keyword = queryOptions?.filterModel?.quickFilterValues?.[0]
        let listData
        listData = await listingApi(pagination.page, accessToken, keyword)
        if (!listData) {
          throw new Error(ERROR_MESSAGE)
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
    setListData,
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
    crudOperation,
  }
}
