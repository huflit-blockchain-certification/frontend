import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { DacApi } from '@/pages/api/DAC/dac.api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'

export interface useDisclosedDACProps {
  activeStep?: number
  setLoading: (state: boolean) => void
  sharedField?: string | string[]
  iSt: string | string[] | undefined
  isPublic: boolean
}

export function useDisclosedDAC({
  activeStep,
  setLoading,
  sharedField,
  iSt,
  isPublic,
}: useDisclosedDACProps) {
  const [cookies] = useCookies(['access_token'])
  const router = useRouter()
  const [disclosedDAC, setDisclosedDAC] = useState<any>()
  const [qrURL, setQRURL] = useState<string | undefined>()
  const checked = useSelector((state: any) => state.checkedFieldReducer.checkedFields)
  const { idDAC } = router.query

  useEffect(() => {
    ;(async () => {
      try {
        if (!idDAC) return
        setLoading(true)
        if (activeStep && activeStep === 0) {
          setDisclosedDAC(undefined)
          setQRURL(undefined)
        } else if (activeStep === 1 || !activeStep) {
          const disclosedDAC = await DacApi.generateProof({
            id: idDAC,
            accessToken: cookies.access_token,
            iSt: isPublic ? iSt : undefined,
            sharedField,
          })
          setQRURL(
            window.location.origin +
              `/verify/${idDAC}${iSt ? `?iSt=${iSt}` : ''}${
                sharedField ? `?sharedField=${sharedField}` : ''
              }`
          )
          setDisclosedDAC(disclosedDAC)
        }
        setLoading(false)
      } catch (err) {
        errorMessage()
      }
    })()
  }, [activeStep, idDAC, cookies.access_token, JSON.stringify(checked)])
  return { disclosedDAC, qrURL }
}
