import { fetcher } from '../fetcher'

const logout = async () => {
  try {
    const record = await fetcher({
      method: 'DELETE',
      url: '/auth/logout',
    })
    return record
  } catch (err: any) {
    console.log(err.message)
  }
}
export { logout }
