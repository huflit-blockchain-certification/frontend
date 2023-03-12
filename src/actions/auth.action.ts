import { SET_ACCESS_TOKEN } from '@/constants'

const setAccessToken = (payload: any) => ({
  type: SET_ACCESS_TOKEN,
  payload,
})

export { setAccessToken }
