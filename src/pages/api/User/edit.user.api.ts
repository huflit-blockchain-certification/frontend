import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const editUserUniversity = async (id: string | number, data: any, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'PATCH',
      url: `/users/universities/${id}`,
      accessToken,
      body: data,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
const editStudentUniversity = async (id: string | number, data: any, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'PATCH',
      url: `/users/students/${id}`,
      accessToken,
      body: data,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
export { editUserUniversity, editStudentUniversity }
