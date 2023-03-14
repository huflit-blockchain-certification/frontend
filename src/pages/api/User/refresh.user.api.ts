import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const refreshToken = async () => {
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
}
export { refreshToken }
