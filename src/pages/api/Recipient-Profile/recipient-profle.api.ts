import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { fetcher } from '../fetcher'
import { CreateParams, DeleteParams, DetailParams, EditParams, ListParams } from 'models'

const RecipientProfileApi = {
  listRecipientProfile: async ({ page, accessToken, keyword, idParam }: ListParams) => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: `/recipientProfiles/${idParam}?dispensingStatus=false&page=${page}&limit=10`,
        accessToken,
      })
      return record
    } catch (err: any) {
      errorMessage()
      console.log(err.message)
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
      errorMessage()
      console.log(err.message)
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
      errorMessage()
      console.log(err.message)
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
      console.log(err.message)
      errorMessage(err.message)
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
      console.log(err.message)
      errorMessage(err.message)
    }
  },
  createIdNumber: async ({ data, accessToken, idParam }: CreateParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        url: `/recipientProfiles/${idParam}/regisIdNumber`,
        body: data,
        accessToken,
      })
      return record
    } catch (err: any) {
      console.log(err.message)
      errorMessage(err.message)
    }
  },
  editRecipientProfile: async ({ id, data, accessToken, idParam }: EditParams) => {
    try {
      const record = await fetcher({
        method: 'PUT',
        url: `/recipientProfiles/${idParam}/updateInfo/${id}`,
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
export { RecipientProfileApi }
