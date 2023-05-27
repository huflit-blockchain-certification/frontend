import { useDisclosedDAC } from '@/hooks/common/useDisclosedDAC'
import { MainLayout } from '@/layouts'
import { useEffect, useState } from 'react'
import { DacApi } from '../api/DAC/dac.api'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { AiFillCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { DACDetail } from '../dac/[idDAC]'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator.component'

export interface VerifyPageProps {}

export default function VerifyPage({}: VerifyPageProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { sharedField, iSt } = router.query
  const [cookies] = useCookies(['access_token'])
  const { disclosedDAC, qrURL } = useDisclosedDAC({ setLoading, sharedField, iSt, isPublic: true })
  const [verified, setVerified] = useState<boolean | undefined>()
  const extraFields =
    sharedField &&
    sharedField
      ?.toString()
      ?.split(',')
      .reduce((obj: any, key) => {
        obj[key] = true
        return obj
      }, {})
  useEffect(() => {
    ;(async () => {
      try {
        if (verified) return
        setLoading(true)
        if (!disclosedDAC) return
        await DacApi.verify({
          accessToken: cookies.access_token,
          data: disclosedDAC?.data?.data,
        })
        setVerified(true)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setVerified(false)
      }
    })()
  }, [JSON.stringify(disclosedDAC), cookies.access_token, verified])
  if (loading) return <LoadingIndicator />
  if (verified === false)
    return (
      <>
        <div
          className="flex flex-col items-center absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AiOutlineCloseCircle size={100} color="#ff2b2b" />
          <div className="font-bold text-2xl"> Xác thực thất bại</div>
        </div>
      </>
    )
  if (verified === true) {
    return (
      <div className="container py-5">
        <div className="flex flex-col items-center">
          <AiFillCheckCircle size={100} color="#39c36e" />
          <div className="font-bold text-2xl"> Xác thực thành công</div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <DACDetail
          DAC={disclosedDAC?.data?.data?.disclosedData}
          extraFields={extraFields}
          verifyKey={disclosedDAC?.data?.data?.key}
          QRCodeOptions={{ enable: true, data: qrURL }}
          pdfOptions={{ enable: true }}
        />
      </div>
    )
  }
}
VerifyPage.Layout = MainLayout
