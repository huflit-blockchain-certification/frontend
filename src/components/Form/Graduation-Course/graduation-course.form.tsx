import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { GraduationCourseApi } from '@/pages/api/Graduation-Course/graduation-course.api'
import { GraduationCourse } from 'models/GraduationCourse'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import { graduationCourseSchema } from '@/validation/Graduation-Course/graduation-course.validation'
import { graduationCourseDefaultForm } from '@/default/graduation-course.default'

function GraduationCourseForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm<GraduationCourse>({
    resolver: yupResolver(graduationCourseSchema),
    defaultValues: graduationCourseDefaultForm,
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
      const graduationCourse = await GraduationCourseApi.detailGraduationCourse({
        id: recordId,
        accessToken: cookies.access_token,
      })
      if (!graduationCourse) return
      reset(_.omit(graduationCourse.data.data, ['_id', 'createdAt', 'updatedAt']))
      setLoading(false)
    })()
  }, [recordId])

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Input name="name" label="Tên khóa" control={control} required />
          <DatePicker name="startDate" label="Ngày bắt đầu" control={control} required />
          <DatePicker name="endDate" label="Ngày kết thúc" control={control} required />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

GraduationCourseForm.Layout = AdminLayout
export default GraduationCourseForm
