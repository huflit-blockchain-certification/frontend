import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerDTO } from '@/DTO/User/register.dto.user'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { User } from 'models/User'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { RecipientProfileApi } from '@/pages/api/Recipient-Profile/recipient-profle.api'
import { RecipientProfileSchema } from '@/validation/Recipient-Profile/recipient-profile.validation'
import { recipientProfileDefaultForm } from '@/default/recipient-profile.default'
import { Select } from '@/components/common/Form/Select/select.component'
import { Input } from '@/components/common/Form/Input/Input.component'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import { countries } from '@/static/countries'
import Radio from '@/components/common/Form/Radio/radio.component'
import { genderOptions } from '@/static/gender'
import { rankingOptions } from '@/static/ranking'
import { formOfTrainingOptions } from '@/static/formOfTraining'

function RecipientProfileForm({ recordId, setOpen, afterActions, idParam }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, setValue, watch } = useForm<User>({
    defaultValues: recipientProfileDefaultForm,
    resolver: yupResolver(RecipientProfileSchema),
  })

  const onSubmit = async (data: registerDTO) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: RecipientProfileApi.createRecipientProfile,
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
      const recipientProfile = await RecipientProfileApi.detailRecipientProfile({
        id: recordId,
        accessToken: cookies.access_token,
      })
      if (!recipientProfile) return
      const response = recipientProfile.data.data
      reset(response)
      setLoading(false)
    })()
  }, [])

  return (
    <FormHeader
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      options={recordId && { disabled: true }}
    >
      <div className="w-full">
        <FormLayout className="relative">
          <Select control={control} name="departmentName" label="Khoa" options={[]} />
          <Input control={control} name="studentName" label="Tên học sinh" />
          <Input control={control} name="universityName" label="Trường đại học" />
          <DatePicker control={control} name="dateOfBirth" label="Ngày sinh" />
          <Input control={control} name="nameCourse" label="Khóa tốt nghiệp" />
          <Select control={control} name="major" label="Ngành" options={[]} />
          <Input control={control} name="placeOfBirth" label="Nơi sinh" />
          <Input control={control} name="nation" label="Dân tộc" />
          <Select control={control} name="ranking" label="Xếp loại" options={rankingOptions} />
          <Select
            control={control}
            name="formOfTraning"
            label="Loại rèn luyện"
            options={formOfTrainingOptions}
          />
          <Input control={control} name="CGPA" label="CGPA" type="number" />
          <Radio control={control} name="gender" label="Giới tính" options={genderOptions} />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

RecipientProfileForm.Layout = AdminLayout
export default RecipientProfileForm
