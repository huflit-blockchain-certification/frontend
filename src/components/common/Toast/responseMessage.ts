import { Toast } from './toast'

const successMessage = (prefix?: string) => {
  return Toast.fire({ title: `${prefix || ''} Successfully`, icon: 'success' })
}

const errorMessage = () => {
  return Toast.fire({ title: `Something went wrong`, icon: 'error' })
}

export { successMessage, errorMessage }
