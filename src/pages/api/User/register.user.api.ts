import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'

const register = async (data: registerDTO) => {
  try {
    const { listUser } = data
    let universityList
    let studentList
    universityList = listUser
      .filter((item: any) => item.roles === 'UNIVERSITY')
      .map((item: any) => {
        item.roles = [item.roles]
        return item
      })
    studentList = listUser
      .filter((item: any) => item.roles === 'STUDENT')
      .map((item: any) => {
        item.roles = [item.roles]
        return item
      })
    if (universityList && universityList.length > 0) {
      const record = await fetcher({
        method: 'POST',
        url: '/auth/register/university',
        body: universityList,
      })
      return record
    }
    if (studentList && studentList.length > 0) {
      const record = await fetcher({
        method: 'POST',
        url: '/auth/register/student',
        body: studentList,
      })
      return record
    }
  } catch (err: any) {
    console.log(err.message)
  }
}

export { register }
