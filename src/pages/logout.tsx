import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { logout } from './api/User/logout.user.api'

export interface LogoutPageProps {}

export default function LogoutPage(props: LogoutPageProps) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
  useEffect(() => {
    ;(async () => {
      await logout()
      removeCookie('access_token')
      removeCookie('refresh_token')
      router.push('/')
    })()
  }, [])
}
