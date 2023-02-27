import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'

const register = async (data: registerDTO) => {
  try {
    const record = await fetcher({ method: 'POST', url: '/auth/register', body: data })
    return record
  } catch (err: any) {
    throw new Error(err.mesasge)
  }
}

export { register }
