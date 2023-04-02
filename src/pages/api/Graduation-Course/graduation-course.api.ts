import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'
import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'

const GraduationCourseApi = {
  createGraduationCourse: async (data: registerDTO, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/graduationCourses`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage(err.message)
    }
  },
  deleteGraduationCourse: async (id: number | string, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: `/graduationCourses/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailGraduationCourse: async (id: string | number, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/graduationCourses/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  editGraduationCourse: async (id: string | number, data: any, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'PATCH',
        url: `/graduationCourses/${id}`,
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
  listGraduationCourse: async (page: number, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/graduationCourses?page=${page}&limit=10`,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
    }
  },
}

export { GraduationCourseApi }
