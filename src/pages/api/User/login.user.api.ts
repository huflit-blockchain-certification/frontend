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
    return record
  } catch (err: any) {
    console.log(err.message)
  }
}
export { login }
