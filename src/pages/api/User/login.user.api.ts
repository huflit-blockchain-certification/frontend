import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { RefreshTokenDTO } from '@/DTO/User/login.dto.user'
import { fetcher } from '../fetcher'

const login = async (data: RefreshTokenDTO, actions: (action: any) => void) => {
  try {
    const record = await fetcher({
      method: 'POST',
      url: '/auth',
      body: data,
    })
    await actions(record)
    successMessage()
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
export { login }
