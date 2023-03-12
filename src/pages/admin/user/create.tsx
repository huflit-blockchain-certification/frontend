import { DatePicker } from '@/components/common/Form/DatePicker/DatePicker'
import { Input } from '@/components/common/Form/Input/Input'
import { AdminLayout, FormLayout, MultipleFormLayout } from '@/layouts'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiOutlineX } from 'react-icons/hi'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '@/validation/User/register.user.validation'
import { FieldValues } from 'react-hook-form/dist/types'
import { registerDTO } from '@/DTO/User/register.dto.user'
import Radio from '@/components/common/Form/Radio/radio'
import { registerDefaultForm } from '@/default/student.register.default'
import { Button } from '@mui/material'
import _ from 'lodash'
import { register } from '@/pages/api/User/register.user.api'
import { Select } from '@/components/common/Form/Select/select'
import { countries } from '@/static/countries'
import { AuthProps } from 'models'
import AuthGlobal from '@/container/auth.global'

function CreateUserPage({ accessToken }: AuthProps) {
  const genderOptions = [
    { value: 'MALE', label: 'Nam' },
    { value: 'FEMALE', label: 'Nữ' },
    { value: 'OTHER', label: 'Khác' },
  ]
  const { control, handleSubmit, reset, watch, setValue } = useForm<registerDTO>({
    resolver: yupResolver(registerSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listUser',
  })
  const onSubmit = async (data: registerDTO) => {
    await register(data, accessToken)
  }
  useEffect(() => {
    reset(registerDefaultForm)
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '')
    if (user && user.roles.includes('STUDENT')) {
      setValue('roles', user.roles)
    }
  }, [])

  const watchRoles = watch('roles')
  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} customActions={<CustomActions append={append} />}>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <MultipleFormLayout key={field.id} className="relative">
            <Input name={`listUser[${index}].name`} label="Tên" control={control} required />
            <Input
              name={`listUser[${index}].phone`}
              label="Số điện thoại"
              control={control}
              required
            />
            <Radio
              label="Giới tính"
              name={`listUser[${index}].gender`}
              control={control}
              options={genderOptions}
            />
            {watchRoles.includes('UNIVERSITY') && (
              <>
                <Select
                  options={countries}
                  optionLabel="en_short_name"
                  optionValue="en_short_name"
                  name={`listUser[${index}].nation`}
                  label="Quốc tịch"
                  control={control}
                  required
                />
                <DatePicker
                  name={`listUser[${index}].dateOfBirth`}
                  label="Ngày sinh"
                  control={control}
                  required
                />
              </>
            )}
            <Input name={`listUser[${index}].address`} label="Địa chỉ" control={control} required />
            <Input name={`listUser[${index}].identity`} label="CMND" control={control} required />
            <Input name={`listUser[${index}].email`} label="Email" control={control} required />
            <Input
              name={`listUser[${index}].userName`}
              label="Tên tài khoản"
              control={control}
              required
            />
            <Input
              name={`listUser[${index}].password`}
              label="Mật khẩu"
              control={control}
              type="password"
              required
            />
            <HiOutlineX
              className="absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={() => remove(index)}
            />
          </MultipleFormLayout>
        ))}
      </div>
    </FormLayout>
  )
}
function CustomActions({ append }: FieldValues) {
  const handleAdd = () => {
    append({})
  }
  return (
    <div className="ml-auto">
      <div className="flex gap-3">
        <Button variant="outlined" onClick={handleAdd}>
          Thêm
        </Button>
        <Button variant="outlined" type="submit">
          Lưu
        </Button>
      </div>
    </div>
  )
}

CreateUserPage.Layout = AdminLayout
export default AuthGlobal(CreateUserPage)
