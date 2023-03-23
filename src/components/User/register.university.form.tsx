import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerUniversitySchema } from '@/validation/User/register.university.user.validation'
import { registerDTO } from '@/DTO/User/register.dto.user'
import Radio from '@/components/common/Form/Radio/radio.component'
import { registerUserUniversityDefaultForm } from '@/default/university.register.default copy'
import _ from 'lodash'
import { registerUniversities } from '@/pages/api/User/register.user.api'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { editUserUniversity } from '@/pages/api/User/edit.user.api'
import { successMessage } from '../common/Toast/response.toast.component'
import { RefInput } from '../common/Form/RefInput/ref.input.component'
import { User } from 'models/User/register.user.model'
import { detailUserUniversity } from '@/pages/api/User/detail.user.api'
import { genderOptions } from '@/static/gender'

function RegisterUniversityForm({ recordId, setOpen }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, setValue, watch } = useForm<User>({
    defaultValues: registerUserUniversityDefaultForm,
    resolver: yupResolver(registerUniversitySchema),
  })

  const onSubmit = async (data: registerDTO) => {
    setLoading(true)
    if (recordId) {
      await editUserUniversity(recordId, data, cookies.access_token)
      return setOpen(false)
    }
    await registerUniversities([data], cookies.access_token)
    setOpen(false)
    setLoading(false)
    successMessage('Created')
  }
  useEffect(() => {
    ;(async () => {
      if (!recordId) return
      setLoading(true)
      const user = await detailUserUniversity(recordId, cookies.access_token)
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
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Input name="phone" label="Số điện thoại" control={control} required />
          <Radio label="Giới tính" name="gender" control={control} options={genderOptions} />
          <Input name="address" label="Địa chỉ" control={control} required />
          {!recordId && (
            <>
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
            </>
          )}
        </FormLayout>
      </div>
    </FormHeader>
  )
}

RegisterUniversityForm.Layout = AdminLayout
export default RegisterUniversityForm
