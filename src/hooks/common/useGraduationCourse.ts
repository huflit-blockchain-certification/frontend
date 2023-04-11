import { GraduationCourseApi } from '@/pages/api/Graduation-Course/graduation-course.api'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export interface useGraduationCourseProps {
  options?: boolean
}

export default function useGraduationCourse({ options }: useGraduationCourseProps) {
  const [graduationCourses, setGraduationCourses] = useState([])
  const [cookies] = useCookies(['access_token'])
  useEffect(() => {
    ;(async () => {
      const graduationCourses = await GraduationCourseApi.listGraduationCourse({
        page: 1,
        pageSize: 100,
        accessToken: cookies.access_token,
      })
      if (!graduationCourses) {
        return
      }
      if (options) {
        return setGraduationCourses(
          graduationCourses.data.data.map((course: any) => {
            return { value: course.name, label: course.name }
          })
        )
      }
      setGraduationCourses(graduationCourses.data.data)
    })()
  }, [])
  return { graduationCourses }
}
