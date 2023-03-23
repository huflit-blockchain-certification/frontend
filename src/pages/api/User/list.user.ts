import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const listUniversitys = async (page: number, keyword: string | undefined, accessToken: string) => {
  try {
    if (keyword) {
      return await fetcher({
        method: 'GET',
        url: `/users/universities/search?keyword=${keyword}&page=${page}&limit=10`,
        accessToken,
      })
    }
    return await fetcher({
      method: 'GET',
      url: '/users/universities?page=1&limit=10',
      accessToken,
    })
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
const listStudents = async (page: number, keyword: string | undefined, accessToken: string) => {
  try {
    if (keyword) {
      return await fetcher({
        method: 'GET',
        url: `/users/students/search?keyword=${keyword}&page=${page}&limit=10`,
        accessToken,
      })
    }
    return await fetcher({
      method: 'GET',
      url: `/users/students?page=${page}&limit=10`,
      accessToken,
    })
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
export { listUniversitys, listStudents }
