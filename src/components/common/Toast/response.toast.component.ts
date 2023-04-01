import { ERROR_MESSAGE } from '@/constants'
import { Toast } from './response.component'

const successMessage = (prefix?: string) => {
  return Toast.fire({ title: `${prefix || ''} thành công`, icon: 'success' })
}

const errorMessage = (message?: string) => {
  return Toast.fire({ title: message ? message : ERROR_MESSAGE, icon: 'error' })
}

export { successMessage, errorMessage }
