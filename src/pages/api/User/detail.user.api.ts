import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'

const detailUserUniversity = async (id: string | number, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'GET',
      url: `/users/universities/detail/${id}`,
      accessToken,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
const detailUserStudent = async (id: string | number, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'GET',
      url: `/users/students/detail/${id}`,
      accessToken,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
    errorMessage()
  }
}
export { detailUserUniversity, detailUserStudent }
