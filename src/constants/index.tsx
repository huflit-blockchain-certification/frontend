const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3001/api/${API_VERSION}`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const ERROR_MESSAGE = 'Đã có lỗi xảy ra !'
const PLUGIN_NAMES = {
  USERS: 'Tài khoản',
  RECIPIENT_PROFILE: 'Hồ sô người nhận',
}
//Redux

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export {
  API_VERSION,
  API_URL,
  API_KEY,
  SET_ACCESS_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ERROR_MESSAGE,
  PLUGIN_NAMES,
}
