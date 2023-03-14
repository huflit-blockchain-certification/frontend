import { Toast } from '@/components/common/Toast/response.component'
import { listStudents } from '@/pages/api/User/list.student.user'
import { useEffect, useState } from 'react'

export function useFetchStudentListUser(accessToken: string) {
  const [listUsers, setListUsers] = useState<any>({})
  useEffect(() => {
    ;(async () => {
      try {
        const listUsers = await listStudents(accessToken)
        setListUsers(listUsers.data)
      } catch (err: any) {
        Toast.fire({ title: err.message, icon: 'error' })
      }
    })()
  }, [accessToken])
  return { listUsers: listUsers?.data, pagination: listUsers?.pagination }
}
