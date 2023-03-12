import AuthGlobal from '@/container/auth.global'
import { AuthProps } from 'models'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { logout } from './api/User/logout.user.api'

function LogoutPage({ accessToken }: AuthProps) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
  useEffect(() => {
    ;(async () => {
      await logout(accessToken)
      removeCookie('access_token')
      removeCookie('refresh_token')
      router.push('/')
    })()
  }, [])
}

export default AuthGlobal(LogoutPage)
