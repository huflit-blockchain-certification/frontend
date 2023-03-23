import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const editUserUniversity = async (id: string | number, data: any, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'PATCH',
      url: `/users/universities/${id}`,
      accessToken,
      body: data,
    })
    successMessage()
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
const editUserStudent = async (id: string | number, data: any, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'PATCH',
      url: `/users/students/${id}`,
      accessToken,
      body: data,
    })
    successMessage()
    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
export { editUserUniversity, editUserStudent }
