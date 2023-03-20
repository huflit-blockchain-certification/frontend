import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Radio from '@/components/common/Form/Radio/radio.component'
import { registerUserStudentDefaultForm } from '@/default/student.register.default'
import _ from 'lodash'
import { registerStudents } from '@/pages/api/User/register.user.api'
import { useCookies } from 'react-cookie'
import { Select } from '@/components/common/Form/Select/select.component'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import { countries } from '@/static/countries'
import { registerStudentSchema } from '@/validation/User/register.student.user.validation'
import { User } from 'models/User/register.user.model'
import { RefInput } from '../common/Form/RefInput/ref.input.component'
import { detailUserStudent } from '@/pages/api/User/detail.user.api'
import { editStudentUniversity } from '@/pages/api/User/edit.user.api'
import { successMessage } from '../common/Toast/response.toast.component'

function RegisterStudentForm({ recordId, setOpen }: any) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)
  const genderOptions = [
    { value: 'MALE', label: 'Nam' },
    { value: 'FEMALE', label: 'Nữ' },
    { value: 'OTHER', label: 'Khác' },
  ]
  const { control, handleSubmit, reset, setValue, watch } = useForm<User>({
    resolver: yupResolver(registerStudentSchema),
    defaultValues: registerUserStudentDefaultForm,
  })
  const onSubmit = async (data: User) => {
    setLoading(true)
    if (recordId) {
      await editStudentUniversity(recordId, data, cookies.access_token)
      return setOpen(false)
    }
    await registerStudents([data], cookies.access_token)
    setOpen(false)
    setLoading(false)
    successMessage('Created')
  }

  useEffect(() => {
    ;(async () => {
      if (!recordId) return
      setLoading(true)
      const user = await detailUserStudent(recordId, cookies.access_token)
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
  }, [recordId])

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Input name="phone" label="Số điện thoại" control={control} required />
          <Radio label="Giới tính" name="gender" control={control} options={genderOptions} />
          <Select
            options={countries}
            optionLabel="en_short_name"
            optionValue="en_short_name"
            name="nation"
            label="Quốc tịch"
            control={control}
            required
          />
          <DatePicker name="dateOfBirth" label="Ngày sinh" control={control} required />
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

RegisterStudentForm.Layout = AdminLayout
export default RegisterStudentForm
