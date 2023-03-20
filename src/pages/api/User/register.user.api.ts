import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'

const registerUniversities = async (data: registerDTO, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'POST',
      url: `/auth/register/university`,
      body: data,
      accessToken,
    })
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage(err.message)
  }
}
const registerStudents = async (data: registerDTO, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'POST',
      url: `/auth/register/student`,
      body: data,
      accessToken,
    })
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage(err.message)
  }
}

export { registerUniversities, registerStudents }
