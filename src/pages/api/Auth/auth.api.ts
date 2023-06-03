import { successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const AuthApi = {
  login: async (data: any, actions: (action: any) => void) => {
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
      throw new Error(err.message)
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
      throw new Error(err.message)
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
      throw new Error(err.message)
    }
  },
}

export { AuthApi }
