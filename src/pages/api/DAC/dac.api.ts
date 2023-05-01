import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'
import { CreateParams, GenerateProof, ListParams, Verify } from 'models'

const DacApi = {
  listAllDacByUni: async ({ page, accessToken, idParam }: ListParams) => {
    try {
      return await fetcher({
        method: 'GET',
        url: `/dac/manage/${idParam}?page=${page}&limit=1`,
        accessToken,
      })
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  listAllDacByStu: async ({ page, accessToken }: ListParams) => {
    try {
      return await fetcher({
        method: 'GET',
        url: `/dac/student?page=${page}&limit=1`,
        accessToken,
      })
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  generateProof: async ({ accessToken, sharedField, idParam }: GenerateProof) => {
    try {
      return await fetcher({
        method: 'GET',
        url: `/dac/student/generateProof/${idParam}?sharedField=${sharedField}`,
        accessToken,
      })
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  issue: async ({ accessToken, data, idParam }: CreateParams) => {
    try {
      return await fetcher({
        body: data,
        method: 'PATCH',
        url: `/dac/manage/${idParam}/issue`,
        accessToken,
      })
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
  verify: async ({ accessToken, data }: Verify) => {
    try {
      return await fetcher({
        body: data,
        method: 'POST',
        url: `/dac/verify`,
        accessToken,
      })
    } catch (err: any) {
      console.log(err.message)
      errorMessage()
    }
  },
}

export { DacApi }
