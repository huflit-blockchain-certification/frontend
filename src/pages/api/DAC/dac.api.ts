import { fetcher } from '../fetcher'
import { CreateParams, DetailParams, GenerateProof, ListParams, Verify } from 'models'

const DacApi = {
  listAllDacByUni: async ({ page, accessToken, idParam }: ListParams) => {
    try {
      if (!idParam) return
      return await fetcher({
        method: 'GET',
        url: `/dac/manage/${idParam}?page=${page}&limit=1`,
        accessToken,
      })
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailDAC: async ({ id, accessToken }: DetailParams) => {
    try {
      return await fetcher({
        method: 'GET',
        url: `/dac/student/detail/${id}`,
        accessToken,
      })
    } catch (err: any) {
      throw new Error(err.message)
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
      throw new Error(err.message)
    }
  },
  generateProof: async ({ id, accessToken, sharedField }: GenerateProof) => {
    try {
      return await fetcher({
        method: 'GET',
        url: `/dac/student/generateProof/${id}${sharedField ? `?sharedField=${sharedField}` : ''}`,
        accessToken,
      })
    } catch (err: any) {
      throw new Error(err.message)
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
      throw new Error(err.message)
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
      throw new Error(err.message)
    }
  },
}

export { DacApi }
