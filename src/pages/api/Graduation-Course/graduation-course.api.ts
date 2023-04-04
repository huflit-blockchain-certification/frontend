import { fetcher } from '../fetcher'
import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const GraduationCourseApi = {
  createGraduationCourse: async ({ data, accessToken }: CreateParams) => {
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
  deleteGraduationCourse: async ({ id, accessToken }: DeleteParams) => {
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
  detailGraduationCourse: async ({ id, accessToken }: DetailParams) => {
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
  editGraduationCourse: async ({ id, data, accessToken }: EditParams) => {
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
  listGraduationCourse: async ({ page, accessToken }: ListParams) => {
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
