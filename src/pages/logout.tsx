import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { AuthApi } from './api/Auth/auth.api'

function LogoutPage() {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token'])
  useEffect(() => {
    ;(async () => {
      if (!cookies.access_token) return
      const logout = await AuthApi.logout(cookies.access_token)
      if (!logout) return router.push('/')
      removeCookie('access_token')
      removeCookie('refresh_token')
      router.push('/')
    })()
  }, [cookies.access_token, removeCookie, router])
}

export default LogoutPage
