import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'
import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'

const GraduationYearApi = {
  createGraduationYear: async (data: registerDTO, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/graduationYears`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage(err.message)
    }
  },
  deleteGraduationYear: async (id: number | string, accessToken: string) => {
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
  detailGraduationYear: async (id: string | number, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/graduationYears/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  editGraduationYear: async (id: string | number, data: any, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'PATCH',
        url: `/graduationYears/${id}`,
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
  listGraduationYear: async (page: number, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/graduationYears?page=${page}&limit=10`,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
    }
  },
}

export { GraduationYearApi }
