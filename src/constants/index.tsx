const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3001/api/${API_VERSION}`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
//Redux

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export { API_VERSION, API_URL, API_KEY, SET_ACCESS_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN }
