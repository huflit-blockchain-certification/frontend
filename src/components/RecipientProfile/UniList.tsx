import { useTableControl } from '@/hooks/common/useTableControl'
import { UniversityApi } from '@/pages/api/User/university.api'
import * as React from 'react'
import { useCookies } from 'react-cookie'
import { UniCard } from './UniCard'
import { LoadingIndicator } from '../common/LoadingIndicator/loadingIndicator.component'
import { Pagination } from '@mui/material'

export interface UniListProps {}

export function UniList(props: UniListProps) {
  const [cookies] = useCookies(['access_token'])

  const { listData, pagination, loading, handlePaginationChange, totalPage } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: UniversityApi.listUniversitys,
  })
  return (
    <>
      {!loading ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {listData.map((data: any) => (
              <UniCard key={data?.id} identity={data?.identity} name={data?.name} />
            ))}
          </div>
          <Pagination
            className="flex justify-end mt-4"
            shape="rounded"
            variant="outlined"
            count={totalPage}
            page={pagination?.page}
            onChange={handlePaginationChange}
          />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  )
}
