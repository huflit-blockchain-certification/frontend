import { LoginDTO } from '@/DTO/User/login.dto.user'
import { fetcher } from '../fetcher'

const login = async (data: LoginDTO) => {
  try {
    const record = await fetcher({ method: 'POST', url: '/api/v1/auth/login', body: data })
    return record
  } catch (err: any) {
    console.log(err.message)
  }
}
export { login }
