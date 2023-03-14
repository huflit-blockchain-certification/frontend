import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import moment from 'moment'
import { refreshToken } from '@/pages/api/User/refresh.user.api'
import { Toast } from '@/components/common/Toast/response.component'

export interface useAuthProps {}

export function useAuth() {
  const router = useRouter()
  const [cookies] = useCookies(['access_token'])
  const [accessToken, setAccessToken] = useState<JwtPayload>()

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
        return await refreshToken()
      }
      setAccessToken(accessToken)
    })()
  }, [])
  return { accessToken }
}
