import { fetcher } from '../fetcher'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'
import _ from 'lodash'
const RecipientProfileApi = {
  listRecipientProfile: async ({ page, accessToken, idParam, extraParams }: ListParams) => {
    const registrationNumber = extraParams?.registrationNumber
    const idNumber = extraParams?.idNumber
    const queryExtra =
      !_.isNil(idNumber) && !_.isNil(registrationNumber)
        ? `registrationNumber=${registrationNumber}&idNumber=${idNumber}`
        : ''
    try {
      if (!idParam) return
      const record = await fetcher({
        method: 'GET',
        url: `/recipientProfiles/${idParam}?page=${page}&limit=10&${queryExtra}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  detailRecipientProfile: async ({ id, accessToken, idParam }: DetailParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/recipientProfiles/${idParam}/detail/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  deleteRecipientProfile: async ({ id, accessToken, idParam }: DeleteParams) => {
    try {
      const record = await fetcher({
        method: 'DELETE',
        url: `/recipientProfiles/${idParam}/delete/${id}`,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  createRecipientProfile: async ({ data, accessToken, idParam }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/recipientProfiles/${idParam}`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  createRegistrationNumber: async ({ data, accessToken, idParam }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/recipientProfiles/${idParam}/registrationNumber`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  createIDNumber: async ({ data, accessToken, idParam }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/recipientProfiles/${idParam}/regisIdNumber`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  editRecipientProfile: async ({ id, data, accessToken, idParam }: EditParams) => {
    try {
      const record = await fetcher({
        method: 'PATCH',
        url: `/recipientProfiles/${idParam}/updateInfo/${id}`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}
export { RecipientProfileApi }
