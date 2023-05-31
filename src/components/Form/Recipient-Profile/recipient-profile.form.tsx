import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { RecipientProfileApi } from '@/pages/api/Recipient-Profile/recipient-profle.api'
import {
  EditRecipientProfileSchema,
  RecipientProfileSchema,
} from '@/validation/Recipient-Profile/recipient-profile.validation'
import { recipientProfileDefaultForm } from '@/default/recipient-profile.default'
import { Select } from '@/components/common/Form/Select/select.component'
import { Input } from '@/components/common/Form/Input/Input.component'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import Radio from '@/components/common/Form/Radio/radio.component'
import { genderOptions } from '@/static/gender'
import { rankingOptions } from '@/static/ranking'
import { formOfTrainingOptions } from '@/static/formOfTraining'
import { majorOptions } from '@/static/major'
import { departmentOptions } from '@/static/department'
import useGraduationCourse from '@/hooks/common/useGraduationCourse'
import { RecipientProfile } from 'models/RecipientProfile'
import { useAuth } from '@/hooks/common/useAuth'
import moment from 'moment'
import useGraduationYear from '@/hooks/common/useGraduationYear'

function RecipientProfileForm({ recordId, setOpen, afterActions, idParam }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { control, handleSubmit, reset } = useForm<RecipientProfile>({
    defaultValues: recipientProfileDefaultForm(),
    resolver: yupResolver(!recordId ? RecipientProfileSchema : EditRecipientProfileSchema),
  })
  const onSubmit = async (data: any) => {
    if (data?.dateOfBirth) {
      data.dateOfBirth = new Date(moment(data?.dateOfBirth).format('YYYY-MM-DD'))
    }
    if (data?.year) {
      data.year = moment(data?.year).format('YYYY')
    }
    commonSubmissionHandler({
      afterActions,
      createRequest: RecipientProfileApi.createRecipientProfile,
      editRequest: RecipientProfileApi.editRecipientProfile,
      formData: !recordId ? [data] : data,
      setLoading,
      setOpen,
      idParam,
      token: cookies.access_token,
      recordId,
    })
  }
  const { graduationCourses } = useGraduationCourse({ options: true })
  const { graduationYears } = useGraduationYear({ options: true })
  useEffect(() => {
    ;(async () => {
      if (!recordId) return
      setLoading(true)
      const recipientProfile = await RecipientProfileApi.detailRecipientProfile({
        id: recordId,
        accessToken: cookies.access_token,
        idParam,
      })
      if (!recipientProfile) return
      const response = recipientProfile.data.data
      reset(
        _.pick(response, [
          'year',
          'nameCourse',
          'major',
          'ranking',
          'formOfTraining',
          'CGPA',
          'departmentName',
        ])
      )
      setLoading(false)
    })()
  }, [idParam, recordId, reset, cookies.access_token])
  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          {!recordId && (
            <>
              <Input control={control} name="id" label="Mã hồ sơ" />
              <Radio control={control} name="gender" label="Giới tính" options={genderOptions} />
              <Input control={control} name="studentName" label="Tên học sinh" />
              <Input control={control} name="iSt" label="Mã học sinh" />
              <Input
                control={control}
                name="iU"
                label="Mã tài khoản đại học"
                defaultValue={user?.userName}
                disabled
              />
              <Input control={control} name="universityName" label="Trường đại học" />
              <DatePicker control={control} name="dateOfBirth" label="Ngày sinh" />
              <Input control={control} name="placeOfBirth" label="Nơi sinh" />
              <Input control={control} name="nation" label="Dân tộc" />
            </>
          )}
          <Select
            control={control}
            name="departmentName"
            label="Khoa"
            options={departmentOptions}
          />
          <Select control={control} name="major" label="Ngành" options={majorOptions} />
          <Select
            control={control}
            name="nameCourse"
            label="Khóa tốt nghiệp"
            options={graduationCourses}
          />
          <Select control={control} name="ranking" label="Xếp loại" options={rankingOptions} />
          <DatePicker
            control={control}
            name="year"
            label="Năm tốt nghiệp"
            format="YYYY"
            views={['year']}
          />
          <Select
            control={control}
            name="formOfTraining"
            label="Hình thức đào tạo"
            options={formOfTrainingOptions}
          />
          <Input control={control} name="CGPA" label="CGPA" type="number" />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

RecipientProfileForm.Layout = AdminLayout
export default RecipientProfileForm
