import { fetcher } from '../fetcher'

const deleteUniversities = async (id: number | string, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'DELETE',
      url: '/users/universities/${id}',
      accessToken,
    })
    return record
  } catch (err: any) {
    throw new Error(err.message)
  }
}
const deleteStudents = async (id: number | string, accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'DELETE',
      url: `/users/students/${id}`,
      accessToken,
    })
    return record
  } catch (err: any) {
    throw new Error(err.message)
  }
}
export { deleteStudents, deleteUniversities }
