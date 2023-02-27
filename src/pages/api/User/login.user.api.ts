import { LoginDTO } from '@/DTO/User/login.dto.user'
import { fetcher } from '../fetcher'

const login = async (data: LoginDTO, actions: () => void) => {
  try {
    const record = await fetcher({
      method: 'POST',
      url: '/auth',
      body: data,
    })
    actions()
    return record
  } catch (err: any) {
    console.log(err.message)
  }
}
export { login }
