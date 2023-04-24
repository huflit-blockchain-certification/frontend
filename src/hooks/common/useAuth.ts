import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import moment from 'moment'
import { Toast } from '@/components/common/Toast/response.component'
import { AuthApi } from '@/pages/api/Auth/auth.api'
import _ from 'lodash'
import { AdminUser } from 'models'
export interface useAuthProps {}

export function useAuth() {
  const router = useRouter()
  const [cookies] = useCookies(['access_token'])
  const [accessToken, setAccessToken] = useState<JwtPayload>()
  const [user, setUser] = useState<AdminUser>()
  useEffect(() => {
    const userInfo = typeof window !== undefined && JSON.parse(localStorage.getItem('user') || '')
    setUser(userInfo)
  }, [])

  useEffect(() => {
    ;(async () => {
      //if dont have token
      const accessToken = cookies?.access_token
      if (!accessToken) {
        router.push('/')
        Toast.fire({
          title: "You don't have permission to access this page",
          icon: 'warning',
        })
        return
      }
      const decodedToken = jwt_decode<JwtPayload>(accessToken)
      const exp = decodedToken?.exp
      // if exp
      const stillValid = moment(exp).unix() < moment().unix()
      if (!stillValid) {
        console.log('Refresh token ...')
        return await AuthApi.refreshToken()
      }
      setAccessToken(accessToken)
    })()
  }, [])
  return { accessToken, user, roles: user?.roles }
}
