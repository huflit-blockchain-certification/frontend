import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
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
  const [totalPage, setTotalPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])
  const [queryOptions, setQueryOptions] = useState<any>({})

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    setQueryOptions({ filterModel: { ...filterModel } })
  }, [])
  const handleRowSelection = useCallback((newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel)
  }, [])

  const handlePaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPagination({ ...pagination, page: value })
    },
    [pagination]
  )

  const handlePaginationModelChange = useCallback(
    (newModel: GridPaginationModel) => {
      setPagination({ ...newModel, ...pagination, page: newModel.page + 1 })
    },
    [pagination]
  )

  const onDeleteRowClick = async () => {
    try {
      if (!deleteApi) return
      await Promise.all(
        rowSelectionModel.map((row) => deleteApi({ id: row, accessToken, idParam }))
      )
      await listing()
      successMessage('Xóa thành công')
    } catch (err: any) {
      errorMessage(err.message)
    }
  }

  const crudOperation: CRUDInterface = {
    //Get list again is the best idea
    create: async (response: any) => {
      await listing()
    },
    edit: async (response: any) => {
      await listing()
    },
  }
  const listing = async () => {
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
      if (totalPage !== listData.data.pagination.totalPage) {
        setTotalPage(listData.data.pagination.totalPage)
      }
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      console.log(err.message)
    }
  }
  useEffect(() => {
    ;(async () => {
      await listing()
    })()
  }, [
    accessToken,
    listingApi,
    idParam,
    JSON.stringify(pagination),
    JSON.stringify(queryOptions),
    JSON.stringify(extraInfo),
  ])

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
    handlePaginationChange,
    open,
    setOpen,
    recordId,
    setRecordId,
    crudOperation,
    idParam,
    totalPage,
  }
}
