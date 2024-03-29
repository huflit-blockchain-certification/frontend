import { successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const StudentApi = {
  deleteStudents: async ({ id, accessToken }: DeleteParams) => {
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
  detailUserStudent: async ({ id, accessToken }: DetailParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/users/students/detail/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  editUserStudent: async ({ id, data, accessToken }: EditParams) => {
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
      throw new Error(err.message)
    }
  },
  listStudents: async ({ page, accessToken, keyword }: ListParams) => {
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
      throw new Error(err.message)
    }
  },
  listStudentsOfUniversity: async ({ page, accessToken, idParam }: ListParams) => {
    try {
      return await fetcher({
        method: 'GET',
        url: `/users/students/createdBy/${idParam}?page=${page}&limit=10`,
        accessToken,
      })
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  registerStudents: async ({ data, accessToken }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/auth/register/student`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}

export { StudentApi }
