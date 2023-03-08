import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'

const register = async (data: registerDTO) => {
  try {
    const { listUser, roles } = data
    const record = await fetcher({
      method: 'POST',
      url: `/auth/register${roles.includes('STUDENT') ? '/student' : '/university'}`,
      body: listUser,
    })
    return record
  } catch (err: any) {
    console.log(err.message)
  }
}

export { register }
