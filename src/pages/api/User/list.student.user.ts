import { fetcher } from '../fetcher'

const listStudents = async (accessToken: string) => {
  try {
    const record = await fetcher({
      method: 'GET',
      url: '/users/universities?page=1&limit=10',
      accessToken,
    })

    return record
  } catch (err: any) {
    console.log(err.message)
  }
}
export { listStudents }
