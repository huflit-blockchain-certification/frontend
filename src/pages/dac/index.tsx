import { CardCertificate } from '@/components/common/CardCertificate/card-certificate.component'
import { MainLayout } from '@/layouts'
import React, { useEffect } from 'react'
import { DacApi } from '../api/DAC/dac.api'
import { useCookies } from 'react-cookie'
import { useTableControl } from '@/hooks/common/useTableControl'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator.component'

export interface infoPageProps {}

export default function InfoPage(props: infoPageProps) {
  const [cookies] = useCookies(['access_token'])
  const {
    listData,
    loading,
    rowSelectionModel,
    onFilterChange,
    handlePaginationModelChange,
    open,
    recordId,
    setRecordId,
    setOpen,
    crudOperation,
  } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: DacApi.listAllDacByStu,
  })
  return (
    <div className="container py-5">
      <div className="flex flex-col gap-5">
        <h4 className="text-2xl font-bold dark:text-white">Danh sách văn bằng</h4>
        {!loading ? (
          <>
            {listData &&
              listData?.map((data: any) => {
                const dac = data?.dac
                if (!dac) return
                return (
                  <CardCertificate
                    key={dac.id}
                    id={dac._id}
                    nameTypeCertificate={dac.nameTypeCertificate}
                    dateOfIssuing={dac.nameOfIssuing}
                    dispensingStatus={dac.dispensingStatus}
                    nameCourse={dac.nameCourse}
                  />
                )
              })}
          </>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  )
}

InfoPage.Layout = MainLayout
