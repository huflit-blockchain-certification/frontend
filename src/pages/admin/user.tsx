import { DatePicker } from '@/components/common/Form/DatePicker/DatePicker'
import { Input } from '@/components/common/Form/Input/Input'
import { AdminLayout, FormLayout, MultipleFormLayout } from '@/layouts'
import { Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiOutlineX } from 'react-icons/hi'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '@/validation/User/register.user.validation'
import { FieldValues } from 'react-hook-form/dist/types'
import { register } from '../api/User/register.user.api'
import { registerDTO } from '@/DTO/User/register.dto.user'
import Radio from '@/components/common/Form/Radio/radio'

export interface UserPageProps {}

export default function UserPage(props: UserPageProps) {
  const defaultForm: registerDTO = {
    listUser: [
      {
        name: '',
        address: '',
        dateOfBirth: new Date(),
        email: '',
        gender: '',
        identity: '',
        nation: '',
        password: '',
        phone: '',
        roles: ['hello'],
        userName: '',
      },
    ],
  }

  const { control, handleSubmit, reset } = useForm<registerDTO>({
    resolver: yupResolver(registerSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listUser',
  })
  const onSubmit = (data: registerDTO) => {
    register(data)
  }
  useEffect(() => {
    reset(defaultForm)
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
            <Input
              name={`listUser[${index}].gender`}
              label="Giới tính"
              control={control}
              required
            />
            <Input
              name={`listUser[${index}].nation`}
              label="Quốc tịch"
              control={control}
              required
            />
            <Input name={`listUser[${index}].address`} label="Địa chỉ" control={control} required />
            <Input name={`listUser[${index}].identity`} label="CMND" control={control} required />
            <DatePicker
              name={`listUser[${index}].dateOfBirth`}
              label="Ngày sinh"
              control={control}
              required
            />
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
            <Radio />
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
        <Button onClick={handleAdd}>Add</Button>
        <Button type="submit">Save</Button>
      </div>
    </div>
  )
}

UserPage.Layout = AdminLayout