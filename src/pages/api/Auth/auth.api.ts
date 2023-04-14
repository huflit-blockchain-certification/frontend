import { RefreshTokenDTO } from '@/DTO/User/login.dto.user'
import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'
import { Toast } from '@/components/common/Toast/response.component'

const AuthApi = {
  login: async (data: RefreshTokenDTO, actions: (action: any) => void) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: '/auth',
        body: data,
      })
      await actions(record)
      successMessage('Đăng nhập')
      return record
    } catch (err: any) {
      Toast.fire({ title: err.message, icon: 'error' })
      console.log(err.message)
    }
  },
  logout: async (accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: '/auth/logout',
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  refreshToken: async () => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: '/auth/refresh',
      })
      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
}

export { AuthApi }
