const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3001/api/${API_VERSION}`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const ERROR_MESSAGE = 'Đã có lỗi xảy ra !'
const PLUGIN_NAMES = {
  OVERVIEW: { NAME: 'Tổng quan', SLUG: '/' },
  USERS: { NAME: 'Tài khoản', SLUG: '/users' },
  RECIPIENT_PROFILE: { NAME: 'Hồ sô người nhận', SLUG: '/recipient-profile' },
  CERT_TYPE: { NAME: 'Bằng cấp', SLUG: '/cert-type' },
  GRADUAUATION_COURSE: { NAME: 'Khóa tốt nghiệp', SLUG: '/graduation-course' },
  GRADUAUATION_YEAR: { NAME: 'Năm tốt nghiệp', SLUG: '/graduation-year' },
  DAC: { NAME: 'Văn bằng chứng chỉ', SLUG: '/dac' },
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
