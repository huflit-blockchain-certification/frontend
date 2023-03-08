import { Toast } from '@/components/common/Toast/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export interface useUserInfoProps {}

export default function useUserInfo() {
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
