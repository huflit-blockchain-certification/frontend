import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const UniversityApi = {
  deleteUniversities: async ({ id, accessToken }: DeleteParams) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: `/users/universities/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailUserUniversity: async ({ id, accessToken }: DetailParams) => {
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
      console.log(err.message)
      errorMessage()
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
        url: '/users/universities?page=1&limit=10',
        accessToken,
      })
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
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
      console.log(err.message)
      errorMessage(err.message)
    }
  },
}

export { UniversityApi }
