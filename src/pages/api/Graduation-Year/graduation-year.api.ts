import { fetcher } from '../fetcher'
import { successMessage } from '@/components/common/Toast/response.toast.component'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const GraduationYearApi = {
  createGraduationYear: async ({ data, accessToken }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/graduationYears`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  deleteGraduationYear: async ({ id, accessToken }: DeleteParams) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: `/graduationYears/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailGraduationYear: async ({ id, accessToken }: DetailParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/graduationYears/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  editGraduationYear: async ({ id, data, accessToken }: EditParams) => {
    try {
      const record = await fetcher({
        method: 'PUT',
        url: `/graduationYears/${id}`,
        accessToken,
        body: data,
      })
      successMessage()
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  listGraduationYear: async ({ page, accessToken }: ListParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/graduationYears?page=${page}&limit=10`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}

export { GraduationYearApi }
