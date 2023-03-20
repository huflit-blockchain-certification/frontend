import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const listUniversitys = async (accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'GET',
      url: '/users/universities?page=1&limit=10',
      accessToken,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
const listStudents = async (page: number, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'GET',
      url: `/users/students?page=${page}&limit=10`,
      accessToken,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
export { listUniversitys, listStudents }
