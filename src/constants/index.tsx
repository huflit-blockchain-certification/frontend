const { env } = process

const API_VERSION = env.API_VERSION
const API_URL = env.API_URL || `http://localhost:3001/api/${API_VERSION || 'v1'}`

export { API_VERSION, API_URL }
