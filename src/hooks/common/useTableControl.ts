import { Toast } from '@/components/common/Toast/response.component'
import { ERROR_MESSAGE } from '@/constants/'
import { GridFilterModel, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'
import { CRUDInterface, DeleteParams, EditParams, ListParams } from 'models'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

interface ExtraInfo {
  extraParams: Object
}
interface useTableControlProps {
  accessToken: string
  listingApi: ({ page, accessToken, keyword, idParam, extraParams: {} }: ListParams) => Promise<any>
  deleteApi?: ({ id, accessToken, idParam }: DeleteParams) => Promise<[]>
  issueApi?: ({ id, accessToken, idParam }: EditParams) => Promise<[]>
  extraInfo?: ExtraInfo
  idKey?: string
}

export function useTableControl({
  accessToken,
  listingApi,
  deleteApi,
  idKey,
  extraInfo,
}: useTableControlProps) {
  const router = useRouter()
  const idParam = idKey && router.query[idKey]
  const [recordId, setRecordId] = useState()
  const [open, setOpen] = useState(false)
  const [listData, setListData] = useState<any>([])
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
      if (!deleteApi) return
      await Promise.all(
        rowSelectionModel.map((row) => deleteApi({ id: row, accessToken, idParam }))
      )
      setListData(listData.filter((item: string | number) => rowSelectionModel.includes(item)))
    } catch (err: any) {
      Toast.fire({ title: ERROR_MESSAGE, icon: 'error' })
    }
  }

  const crudOperation: CRUDInterface = {
    create: (response: any) => {
      const responeData = response?.data?.data
      if (!response || !responeData) return
      if (Array.isArray(responeData)) {
        setListData([...listData, ...responeData])
      } else {
        setListData([...listData, responeData])
      }
    },
    edit: (response: any) => {
      if (!response || !response?.data?.data) return
      setListData(
        listData.map((item: any) => {
          if (item?._id === response.data.data._id) {
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
        const listData = await listingApi({
          page: pagination.page,
          accessToken,
          keyword,
          idParam,
          extraParams: extraInfo && { ...extraInfo.extraParams },
        })
        if (!listData) {
          return
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
  }, [accessToken, pagination?.page, queryOptions, listingApi, idParam, JSON.stringify(extraInfo)])
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
    idParam,
  }
}
