import { fetcher } from '../fetcher'
import { VerifyKeyParams } from 'models'

const VerifyKeyApi = {
  verifyKey: async ({ data }: VerifyKeyParams) => {
    try {
      const record = await fetcher({
        method: 'POST',
        body: data,
        url: `/dac/verifyCrypto`,
      })
      return record
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}

export { VerifyKeyApi }
