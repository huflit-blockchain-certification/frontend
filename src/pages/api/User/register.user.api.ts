import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'

const register = async (data: registerDTO, accessToken: string) => {
  try {
    const { listUser } = data
    const record = await fetcher({
      method: 'POST',
      url: `/auth/register/university`,
      body: listUser,
      accessToken,
    })
    await successMessage('Created')
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage(err.message)
  }
}

export { register }
