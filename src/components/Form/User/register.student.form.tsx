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
import { UserStudent } from 'models/User'
import { RefInput } from '../../common/Form/RefInput/ref.input.component'
import { FormProps } from 'models'
import { genderOptions } from '@/static/gender'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { StudentApi } from '@/pages/api/User/student.api'
import moment from 'moment'
import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { AutoComplete } from '@/components/common/Form/AutoComplete/autocomplete.component'
import { cityOptions } from '@/static/city'

function RegisterStudentForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, setValue, watch } = useForm<UserStudent>({
    resolver: yupResolver(recordId ? editStudentSchema : registerStudentSchema),
    defaultValues: registerUserStudentDefaultForm(),
  })
  const onSubmit = async (data: UserStudent) => {
    if (data?.dateOfBirth) {
      data.dateOfBirth = new Date(moment(data?.dateOfBirth).format('YYYY-MM-DD'))
    }
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
      try {
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
      } catch (err: any) {
        setLoading(false)
        errorMessage(err.message)
      }
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
          <AutoComplete
            name="address"
            label="Địa chỉ"
            control={control}
            required
            options={cityOptions}
          />
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
