import { MainLayout } from '@/layouts'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { DacApi } from '../api/DAC/dac.api'
import { useCookies } from 'react-cookie'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator.component'
import moment from 'moment'
import { Button, Checkbox } from '@mui/material'
import { Modal } from '@/components/common/Modal/modal.component'
import { fieldDefault } from '@/constants'
import { fieldShareExtend } from '@/constants'
import { DACCustomRender } from '@/components/DAC/DACCustomRender'
import { DACStepper } from '@/components/DAC/DACStepper'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckedField } from '@/actions/checked-field.action'
import QRCode from 'qrcode.react'
import { useDisclosedDAC } from '@/hooks/common/useDisclosedDAC'
import { useReactToPrint } from 'react-to-print'

export interface InfoDACPageProps {}
export interface FirstScreenProps {
  DAC: any
}
export interface DACDetail {
  DAC: any
  verifyKey?: string
  shareOptions?: { setOpen?: any; enable: boolean }
  extraFields?: any
  QRCodeOptions?: { enable: boolean; data: any }
  pdfOptions?: { enable: true }
  verified?: boolean
}
export function FirstScreen({ DAC }: FirstScreenProps) {
  const dispatch = useDispatch()
  const checked = useSelector((state: any) => state.checkedFieldReducer.checkedFields)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCheckedField({
        ...checked,
        [event.target.name]: event.target.checked,
      })
    )
  }
  if (!DAC) return null
  return (
    <>
      <div className="font-bold text-2xl mb-4">Chọn thông tin chia sẻ</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold">Thông tin mặc định</div>
          {fieldDefault.map((field, index) => {
            return <DACCustomRender key={index} field={field} data={DAC?.[field]} DAC={DAC} />
          })}
        </div>
        <div>
          <div className="font-bold">Thông tin thêm</div>
          {fieldShareExtend.map((field, index) => {
            return (
              <div key={index} className="flex gap-1 items-center">
                <Checkbox checked={checked[field]} onChange={handleChange} name={field} />
                <DACCustomRender key={index} field={field} data={DAC?.[field]} DAC={DAC} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export function DACDetail({
  DAC,
  shareOptions,
  extraFields,
  QRCodeOptions,
  pdfOptions,
  verifyKey,
}: DACDetail) {
  const [isPrinting, setIsPrinting] = useState(false)
  const promiseResolveRef = useRef<null | (() => void)>(null)
  const pdfAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current()
    }
  }, [isPrinting])
  const handlePrint = useReactToPrint({
    content: () => pdfAreaRef.current,
    copyStyles: true,
    documentTitle: `${DAC?.id || ''}-vbcc`,
    onBeforeGetContent: () => {
      return new Promise<void>((resolve) => {
        promiseResolveRef.current = resolve
        setIsPrinting(true)
      })
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null
      setIsPrinting(false)
    },
  })
  if (!DAC) return null

  return (
    <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg">
      <div className="flex justify-end">
        {shareOptions && shareOptions?.enable && (
          <Button variant="outlined" onClick={() => shareOptions?.setOpen(true)}>
            Chia sẻ
          </Button>
        )}
        {pdfOptions && pdfOptions?.enable && (
          <Button variant="outlined" onClick={handlePrint}>
            Tải PDF
          </Button>
        )}
      </div>
      <div ref={pdfAreaRef} className="p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Cộng hòa xã hội chủ nghĩa Việt Nam</h1>
        <h1 className="text-2xl font-bold text-center mb-4">
          Hiệu trưởng trường {DAC?.universityName}
        </h1>
        <div className="text-center">cấp</div>
        <div className="flex flex-col gap-3">
          {fieldDefault.map((field, index) => {
            return <DACCustomRender key={index} field={field} data={DAC?.[field]} DAC={DAC} />
          })}
          {extraFields &&
            Object.keys(extraFields).map(function (field, index) {
              if (!extraFields[field]) return
              return <DACCustomRender key={index} field={field} data={DAC?.[field]} DAC={DAC} />
            })}
          {verifyKey && (
            <p>
              Mã xác thực: <span className="font-bold"> {verifyKey}</span>
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <p>TPHCM , {moment(DAC?.dateOfIssuing).format('DD-MM-YYYY')}</p>
          {QRCodeOptions && QRCodeOptions?.enable && <QRCode value={QRCodeOptions?.data} />}
        </div>
      </div>
    </div>
  )
}
export default function InfoDACPage(props: InfoDACPageProps) {
  const [cookies] = useCookies(['access_token'])
  const [open, setOpen] = useState(false)
  const [DAC, setDAC] = useState<any>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { idDAC } = router.query
  const iSt = DAC?.iSt
  const [activeStep, setActiveStep] = useState(0)
  const checked = useSelector((state: any) => state.checkedFieldReducer.checkedFields)
  const sharedField = Object.keys(checked)
    .reduce((obj: any, key) => {
      if (checked[key]) {
        obj.push(key)
      }
      return obj
    }, [])
    .join(',')
  const { disclosedDAC, qrURL } = useDisclosedDAC({
    activeStep,
    setLoading,
    sharedField,
    iSt,
    isPublic: false,
  })
  useEffect(() => {
    ;(async () => {
      try {
        if (!idDAC) return null
        setLoading(true)
        const DAC = await DacApi.detailDAC({ id: idDAC, accessToken: cookies.access_token })
        setDAC(DAC.data.data)
        setLoading(false)
      } catch (err: any) {
        console.log(err.message)
      }
    })()
  }, [cookies.access_token, idDAC])
  return (
    <>
      {!loading ? (
        <>
          <div className="container mx-auto mt-10">
            <Modal open={open} setOpen={setOpen} width={1000}>
              <div className="flex flex-col gap-3">
                <DACStepper activeStep={activeStep} setActiveStep={setActiveStep} qrURL={qrURL}>
                  {activeStep === 0 && <FirstScreen DAC={DAC} />}
                  {activeStep === 1 && (
                    <DACDetail
                      DAC={disclosedDAC?.data?.data?.disclosedData}
                      verifyKey={disclosedDAC?.data?.data?.key}
                      extraFields={checked}
                      QRCodeOptions={{ enable: true, data: qrURL }}
                      pdfOptions={{ enable: true }}
                    />
                  )}
                </DACStepper>
              </div>
            </Modal>
            <DACDetail shareOptions={{ setOpen, enable: true }} DAC={DAC} />
          </div>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  )
}

InfoDACPage.Layout = MainLayout
