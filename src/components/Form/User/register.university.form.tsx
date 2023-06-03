import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerUniversitySchema } from '@/validation/User/register.university.user.validation'
import { registerUserUniversityDefaultForm } from '@/default/university.register.default'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { RefInput } from '../../common/Form/RefInput/ref.input.component'
import { UserUniversity } from 'models/User'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { UniversityApi } from '@/pages/api/User/university.api'
import { errorMessage } from '@/components/common/Toast/response.toast.component'

function RegisterUniversityForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, setValue, watch } = useForm<UserUniversity>({
    defaultValues: registerUserUniversityDefaultForm(),
    resolver: yupResolver(registerUniversitySchema),
  })
  const onSubmit = async (data: any) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: UniversityApi.registerUniversities,
      editRequest: UniversityApi.editUserUniversity,
      formData: [data],
      setLoading,
      setOpen,
      token: cookies.access_token,
      recordId,
    })
  }
  useEffect(() => {
    ;(async () => {
      try {
        if (!recordId) return
        setLoading(true)
        const user = await UniversityApi.detailUserUniversity({
          id: recordId,
          accessToken: cookies.access_token,
        })
        if (!user) return
        const response = _.omit(user.data.data, ['_id', 'createdBy', 'createdAt', 'updatedAt'])
        response.userName = response.idUser.userName
        reset(response)
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        errorMessage(err.message)
      }
    })()
  }, [recordId])
  return (
    <FormHeader
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      options={recordId && { disabled: true }}
    >
      <div className="w-full">
        <FormLayout className="relative">
          <Input name="phone" label="Số điện thoại" control={control} required />
          <Input name="address" label="Địa chỉ" control={control} required />
          <Input name="name" label="Tên" control={control} required />
          <Input name="identity" label="Mã định danh" control={control} required />
          <RefInput
            name="userName"
            label="Tên tài khoản"
            baseInput={watch('identity')}
            control={control}
            required
            setValue={setValue}
          />
          <Input name="email" label="Email" control={control} required />
          {!recordId && (
            <Input name="password" label="Mật khẩu" control={control} type="password" required />
          )}
        </FormLayout>
      </div>
    </FormHeader>
  )
}

RegisterUniversityForm.Layout = AdminLayout
export default RegisterUniversityForm
