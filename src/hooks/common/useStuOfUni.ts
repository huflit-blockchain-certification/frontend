import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { StudentApi } from '@/pages/api/User/student.api'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export interface useStuOfUniProps {
  options?: boolean
}

export default function useStuOfUni({ options }: useStuOfUniProps) {
  const [studentsOfUniversity, setStudentsOfUniversity] = useState([])
  const [cookies] = useCookies(['access_token'])
  useEffect(() => {
    ;(async () => {
      try {
        const graduationCourses = await StudentApi.listStudentsOfUniversity({
          page: 1,
          idParam: '',
          pageSize: 100,
          accessToken: cookies.access_token,
        })
        if (!graduationCourses) {
          return
        }
        if (options) {
          return setStudentsOfUniversity(
            graduationCourses.data.data.map((course: any) => {
              return { value: course.id, label: course.name }
            })
          )
        }
        setStudentsOfUniversity(graduationCourses.data.data)
      } catch (err) {
        errorMessage()
      }
    })()
  }, [])
  return { studentsOfUniversity }
}
