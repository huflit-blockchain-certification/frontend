import { Toast } from './response.component'

const successMessage = (prefix?: string) => {
  return Toast.fire({ title: `${prefix || ''} Successfully`, icon: 'success' })
}

const errorMessage = (message?: string) => {
  return Toast.fire({ title: message ? message : `Something went wrong`, icon: 'error' })
}

export { successMessage, errorMessage }
