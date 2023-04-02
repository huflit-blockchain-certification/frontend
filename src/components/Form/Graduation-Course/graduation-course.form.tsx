import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { certTypeDefaultForm } from '@/default/cert-type.default'
import { GraduationCourseApi } from '@/pages/api/Graduation-Course/graduation-course.api'
import { GraduationCourse } from 'models/GraduationCourse'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import { graduationCourseSchema } from '@/validation/Graduation-Course/graduation-course.validation'

function GraduationCourseForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, watch } = useForm<GraduationCourse>({
    resolver: yupResolver(graduationCourseSchema),
    defaultValues: certTypeDefaultForm,
  })
  const onSubmit = async (data: GraduationCourse) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: GraduationCourseApi.createGraduationCourse,
      editRequest: GraduationCourseApi.editGraduationCourse,
      formData: data,
      setLoading,
      setOpen,
      token: cookies.access_token,
      recordId,
    })
  }

  useEffect(() => {
    ;(async () => {
      if (!recordId) return
      setLoading(true)
      const graduationCourse = await GraduationCourseApi.detailGraduationCourse(
        recordId,
        cookies.access_token
      )
      if (!graduationCourse) return
      reset(graduationCourse.data.data)
      setLoading(false)
    })()
  }, [recordId])

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Input name="name" label="Tên bằng" control={control} required />
          <DatePicker name="startDate" label="Ngày bắt đầu" control={control} required />
          <DatePicker name="endDate" label="Ngày kết thúc" control={control} required />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

GraduationCourseForm.Layout = AdminLayout
export default GraduationCourseForm
