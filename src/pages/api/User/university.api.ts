import { successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const UniversityApi = {
  detailUserUniversity: async ({ id, accessToken }: DetailParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/users/universities/detail/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  editUserUniversity: async ({ id, data, accessToken }: EditParams) => {
    try {
      const record = await fetcher({
        method: 'PATCH',
        url: `/users/universities/${id}`,
        accessToken,
        body: data,
      })
      successMessage()
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  listUniversitys: async ({ page, accessToken, keyword }: ListParams) => {
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
        url: `/users/universities?page=${page}&limit=10`,
        accessToken,
      })
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  registerUniversities: async ({ data, accessToken }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/auth/register/university`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}

export { UniversityApi }
