import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'
import { registerDTO } from '@/DTO/User/register.dto.user'

const StudentApi = {
  deleteStudents: async (id: number | string, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: `/users/students/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailUserStudent: async (id: string | number, accessToken: string) => {
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
  },
  editUserStudent: async (id: string | number, data: any, accessToken: string) => {
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
  },
  listStudents: async (page: number, accessToken: string, keyword: string | undefined) => {
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
  },
  registerStudents: async (data: registerDTO, accessToken: string) => {
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
  },
}

export { StudentApi }
