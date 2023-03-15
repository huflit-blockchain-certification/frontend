import { Toast } from '@/components/common/Toast/response.component'
import { listStudents } from '@/pages/api/User/list.user'
import { useEffect, useState } from 'react'

export function useFetchStudentListUser(accessToken: string) {
  const [listUsers, setListUsers] = useState<any>({})
  const [pagination, setPagination] = useState<any>({ page: 1, pageSize: 10 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const listUsers = await listStudents(pagination.page, accessToken)
        if (!listUsers) {
          throw new Error('Something went wrong')
        }
        setListUsers(listUsers.data.data)
        setPagination({
          page: listUsers.data.pagination.page,
          pageSize: listUsers.data.pagination.limit,
          pageCount: 100,
        })
        setLoading(false)
      } catch (err: any) {
        Toast.fire({ title: err.message, icon: 'error' })
      }
    })()
  }, [accessToken, pagination.page])
  return { listUsers, pagination, setPagination, loading }
}
