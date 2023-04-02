import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from './fetcher'
import { registerDTO } from '@/DTO/User/register.dto.user'

const UniversityApi = {
  deleteUniversities: async (id: number | string, accessToken: string) => {
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
  detailUserUniversity: async (id: string | number, accessToken: string) => {
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
  editUserUniversity: async (id: string | number, data: any, accessToken: string) => {
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
  listUniversitys: async (page: number, accessToken: string, keyword: string | undefined) => {
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
  registerUniversities: async (data: registerDTO, accessToken: string) => {
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
