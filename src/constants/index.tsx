const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3001/api/${API_VERSION}`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''

export { API_VERSION, API_URL, API_KEY }
