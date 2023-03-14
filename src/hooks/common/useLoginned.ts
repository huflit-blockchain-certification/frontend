import { Toast } from '@/components/common/Toast/response.component'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export interface useLogginedProps {}

export default function useLoggined() {
  const router = useRouter()
  const [cookies] = useCookies(['access_token'])
  useEffect(() => {
    const accessToken = cookies.access_token
    const path = router.pathname
    if (accessToken) {
      router.back()
      Toast.fire({ title: 'You have loggined alreay', icon: 'error' })
      return
    }
  }, [])
}
