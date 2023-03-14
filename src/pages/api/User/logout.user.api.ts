import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const logout = async (accessToken: string) => {
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
}
export { logout }
