import { errorMessage } from '@/components/common/Toast/responseMessage'
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
