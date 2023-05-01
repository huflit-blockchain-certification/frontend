import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Radio from '@/components/common/Form/Radio/radio.component'
import { registerUserStudentDefaultForm } from '@/default/student.register.default'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import {
  editStudentSchema,
  registerStudentSchema,
} from '@/validation/User/register.student.user.validation'
import { User } from 'models/User'
import { RefInput } from '../../common/Form/RefInput/ref.input.component'
import { FormProps } from 'models'
import { genderOptions } from '@/static/gender'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { StudentApi } from '@/pages/api/User/student.api'

function RegisterStudentForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, setValue, watch } = useForm<User>({
    resolver: yupResolver(recordId ? editStudentSchema : registerStudentSchema),
    defaultValues: registerUserStudentDefaultForm,
  })
  const onSubmit = async (data: User) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: StudentApi.registerStudents,
      editRequest: StudentApi.editUserStudent,
      formData: !recordId ? [data] : data,
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
      const user = await StudentApi.detailUserStudent({
        id: recordId,
        accessToken: cookies.access_token,
      })
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
          <Input name="nation" label="Dân tộc" control={control} required />
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
