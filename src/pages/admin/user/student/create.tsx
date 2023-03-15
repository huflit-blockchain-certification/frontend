import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormLayout, MultipleFormLayout } from '@/layouts'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiOutlineX } from 'react-icons/hi'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues } from 'react-hook-form/dist/types'
import { registerDTO } from '@/DTO/User/register.dto.user'
import Radio from '@/components/common/Form/Radio/radio.component'
import { registerUserStudentDefaultForm } from '@/default/student.register.default'
import { Button } from '@mui/material'
import _ from 'lodash'
import { registerStudents } from '@/pages/api/User/register.user.api'
import { useCookies } from 'react-cookie'
import { Select } from '@/components/common/Form/Select/select.component'
import { DatePicker } from '@/components/common/Form/DatePicker/datepicker.component'
import { countries } from '@/static/countries'
import { registerStudentSchema } from '@/validation/User/register.student.user.validation'
import { whatToDoNextModal } from '@/components/common/WhatToDoNextModal/whatToDoNextModal'
import { useRouter } from 'next/router'

function CreateUserPage() {
  const [cookies] = useCookies(['access_token'])
  const router = useRouter()
  const genderOptions = [
    { value: 'MALE', label: 'Nam' },
    { value: 'FEMALE', label: 'Nữ' },
    { value: 'OTHER', label: 'Khác' },
  ]
  const { control, handleSubmit, reset } = useForm<registerDTO>({
    resolver: yupResolver(registerStudentSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listUser',
  })
  const onSubmit = async (data: registerDTO) => {
    const customData = {
      ...data,
      listUser: data.listUser.map((item) => {
        item.userName = item.identity
        return item
      }),
    }
    await registerStudents(customData, cookies.access_token, async () => {
      await whatToDoNextModal({
        action: 'create',
        onConfirm: () => reset(registerUserStudentDefaultForm),
        onDismiss: () => router.back(),
      })
    })
  }
  useEffect(() => {
    reset(registerUserStudentDefaultForm)
  }, [])

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
            <Input name={`listUser[${index}].address`} label="Địa chỉ" control={control} required />
            <Input name={`listUser[${index}].identity`} label="CMND" control={control} required />
            <Input name={`listUser[${index}].email`} label="Email" control={control} required />
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
export default CreateUserPage
