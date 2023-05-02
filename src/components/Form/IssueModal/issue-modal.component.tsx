import { Modal } from '@/components/common/Modal/modal.component'
import { Toast } from '@/components/common/Toast/response.component'
import { ERROR_MESSAGE } from '@/constants'
import { useTableControl } from '@/hooks/common/useTableControl'
import { CertTypeApi } from '@/pages/api/Cert-Type/cert-type.api'
import { DacApi } from '@/pages/api/DAC/dac.api'
import { Button, Pagination } from '@mui/material'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

export interface IssueModalProps {
  rowSelectionModel: GridRowSelectionModel
  accessToken: string
  idParam: string | string[] | undefined
  afterIssue: any
}

export default function IssueModal({
  rowSelectionModel,
  accessToken,
  idParam,
  afterIssue,
}: IssueModalProps) {
  const [cookies] = useCookies(['access_token'])
  const [selectedCert, setSelectedCert] = useState<string>()
  const [open, setOpen] = useState(false)
  const { listData } = useTableControl({
    accessToken: cookies.access_token,
    listingApi: CertTypeApi.listCertType,
  })

  const onIssueClick = async () => {
    try {
      if (!selectedCert) return
      const issueData = {
        listDAC: rowSelectionModel.map((row) => {
          return {
            _id: row,
          }
        }),
        idCertificate: selectedCert,
      }
      const response = await DacApi.issue({ data: issueData, accessToken, idParam })
      afterIssue(response)
    } catch (err: any) {
      Toast.fire({ title: ERROR_MESSAGE, icon: 'error' })
    }
  }
  const onSelectCert = (id: string) => {
    setSelectedCert(id)
  }

  return (
    <>
      <Button variant="outlined" color="error" className="mb-2" onClick={() => setOpen(true)}>
        Cấp bằng
      </Button>
      <Modal open={open} setOpen={setOpen}>
        <div className="h-full flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="text-xl font-bold ">Chọn bằng</div>
            <Button variant="outlined" className="ml-auto" onClick={onIssueClick}>
              Cấp
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {listData &&
              listData.map((cert: any) => (
                <div
                  key={cert?._id}
                  className={`flex gap-1 p-3 shadow items-center cursor-pointer ${
                    selectedCert === cert?._id && 'bg-violet-300'
                  } `}
                  onClick={() => onSelectCert(cert?._id)}
                >
                  <div>{cert?.name} </div>
                  {cert?.type === 'DIPLOMA' ? (
                    <span className=" ml-auto bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Văn bằng
                    </span>
                  ) : (
                    <span className="ml-auto bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                      Chứng chỉ
                    </span>
                  )}
                </div>
              ))}
            <Pagination className="ml-auto" shape="rounded" variant="outlined" />
          </div>
        </div>
      </Modal>
    </>
  )
}
