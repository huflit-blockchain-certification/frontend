import { AuthProps } from 'models'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { AuthApi } from './api/Auth/auth.api'

function LogoutPage({ accessToken }: AuthProps) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
  useEffect(() => {
    ;(async () => {
      await AuthApi.logout(accessToken)
      removeCookie('access_token')
      removeCookie('refresh_token')
      router.push('/')
    })()
  }, [])
}

export default LogoutPage
