import { fetcher } from '../fetcher'
import { successMessage } from '@/components/common/Toast/response.toast.component'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const CertTypeApi = {
  createCertType: async ({ data, accessToken }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/certTypes`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  deleteCertType: async ({ id, accessToken }: DeleteParams) => {
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
  detailCertType: async ({ id, accessToken }: DetailParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/certTypes/${id}`,
        accessToken,
      })

      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  editCertType: async ({ id, data, accessToken }: EditParams) => {
    try {
      const record = await fetcher({
        method: 'PUT',
        url: `/certTypes/${id}`,
        accessToken,
        body: data,
      })
      successMessage()
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  listCertType: async ({ page, accessToken }: ListParams) => {
    console.log(accessToken)
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/certTypes?page=${page}&limit=10`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}

export { CertTypeApi }
