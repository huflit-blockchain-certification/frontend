import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerUniversitySchema } from '@/validation/User/register.university.user.validation'
import { registerDTO } from '@/DTO/User/register.dto.user'
import Radio from '@/components/common/Form/Radio/radio.component'
import { registerUserUniversityDefaultForm } from '@/default/university.register.default'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { RefInput } from '../../common/Form/RefInput/ref.input.component'
import { User } from 'models/User'
import { genderOptions } from '@/static/gender'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { UniversityApi } from '@/pages/api/university.api'

function RegisterUniversityForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, setValue, watch } = useForm<User>({
    defaultValues: registerUserUniversityDefaultForm,
    resolver: yupResolver(registerUniversitySchema),
  })

  const onSubmit = async (data: registerDTO) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: UniversityApi.registerUniversities,
      editRequest: UniversityApi.editUserUniversity,
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
      const user = await UniversityApi.detailUserUniversity(recordId, cookies.access_token)
      if (!user) return
      const response = _.omit(user.data.data, [
        'identity',
        'name',
        '_id',
        'idUser',
        'email',
        'createdBy',
        'createdAt',
        'updatedAt',
      ])
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
          <Input name="phone" label="Số điện thoại" control={control} required />
          <Radio label="Giới tính" name="gender" control={control} options={genderOptions} />
          <Input name="address" label="Địa chỉ" control={control} required />
          <Input name="name" label="Tên" control={control} required />
          <Input name="identity" label="CMND" control={control} required />
          <RefInput
            name="userName"
            label="Tên tài khoản"
            baseInput={watch('identity')}
            control={control}
            required
            setValue={setValue}
          />
          <Input name="email" label="Email" control={control} required />
          <Input name="password" label="Mật khẩu" control={control} type="password" required />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

RegisterUniversityForm.Layout = AdminLayout
export default RegisterUniversityForm
