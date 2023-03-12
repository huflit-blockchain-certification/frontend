import { errorMessage, successMessage } from '@/components/common/Toast/responseMessage'
import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'

const register = async (data: registerDTO, accessToken: string) => {
  try {
    const { listUser, roles } = data
    const record = await fetcher({
      method: 'POST',
      url: `/auth/register${roles.includes('STUDENT') ? '/student' : '/university'}`,
      body: listUser,
      accessToken,
    })
    successMessage('Created')
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}

export { register }
