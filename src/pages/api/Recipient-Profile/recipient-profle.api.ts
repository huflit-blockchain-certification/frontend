import { fetcher } from '../fetcher'

const RecipientProfileApi = {
  listRecipientProfile: async () => {
    try {
      const record = await fetcher({
        method: 'GET',
        url: '/recipientProfiles/101110009113?dispensingStatus=false&page=1&limit=2',
      })
      return record
    } catch (err: any) {
      console.log(err.message)
    }
  },
}
export { RecipientProfileApi }
