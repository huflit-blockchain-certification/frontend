import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { GraduationYearApi } from '@/pages/api/Graduation-Year/graduation-year.api'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export interface useGraduationYearProps {
  options?: boolean
}

export default function useGraduationYear({ options }: useGraduationYearProps) {
  const [graduationYears, setGraduationYears] = useState([])
  const [cookies] = useCookies(['access_token'])
  useEffect(() => {
    ;(async () => {
      try {
        const graduationYears = await GraduationYearApi.listGraduationYear({
          page: 1,
          pageSize: 100,
          accessToken: cookies.access_token,
        })
        if (!graduationYears) {
          return
        }
        if (options) {
          return setGraduationYears(
            graduationYears.data.data.map((course: any) => {
              return { value: course.year, label: course.year }
            })
          )
        }
        setGraduationYears(graduationYears.data.data)
      } catch (err) {
        errorMessage()
      }
    })()
  }, [cookies.access_token, options])
  return { graduationYears }
}
