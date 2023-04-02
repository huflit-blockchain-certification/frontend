import { registerDTO } from '@/DTO/User/register.dto.user'
import { fetcher } from '../fetcher'
import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'

const CertTypeApi = {
  createCertType: async (data: registerDTO, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/certTypes`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage(err.message)
    }
  },
  deleteCertType: async (id: number | string, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: `/certTypes/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailCertType: async (id: string | number, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/certTypes/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  editCertType: async (id: string | number, data: any, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'PATCH',
        url: `/certTypes/${id}`,
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
  listCertType: async (page: number, accessToken: string) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/certTypes?page=${page}&limit=10`,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
    }
  },
}

export { CertTypeApi }
