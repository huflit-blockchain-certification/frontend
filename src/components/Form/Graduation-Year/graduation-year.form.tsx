import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { GraduationYearApi } from '@/pages/api/Graduation-Year/graduation-year.api'
import { GraduationYear } from 'models/GraduationYear'
import { graduationYearDefaultForm } from '@/default/graduation-year.default'
import { graduationYearSchema } from '@/validation/Graduation-Year/graduation-year.validation'

function GraduationYearForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm<GraduationYear>({
    resolver: yupResolver(graduationYearSchema),
    defaultValues: graduationYearDefaultForm,
  })
  const onSubmit = async (data: GraduationYear) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: GraduationYearApi.createGraduationYear,
      editRequest: GraduationYearApi.editGraduationYear,
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
      const graduationCourse = await GraduationYearApi.detailGraduationYear(
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
          <Input name="year" label="Năm" control={control} required />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

GraduationYearForm.Layout = AdminLayout
export default GraduationYearForm
