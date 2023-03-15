import { Toast } from '@/components/common/Toast/response.component'
import { listStudents, listUniversitys } from '@/pages/api/User/list.user'
import { useEffect, useState } from 'react'

export function useFetchUniversityListUser(accessToken: string) {
  const [listUsers, setListUsers] = useState<any>({})
  const [pagination, setPagination] = useState<any>({})
  useEffect(() => {
    ;(async () => {
      try {
        const listUsers = await listUniversitys(accessToken)
        setListUsers(listUsers.data.data)
        setPagination(listUsers.data.pagination)
      } catch (err: any) {
        Toast.fire({ title: err.message, icon: 'error' })
      }
    })()
  }, [accessToken])
  return { listUsers, pagination }
}
