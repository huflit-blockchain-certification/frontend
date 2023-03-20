import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiOutlineX } from 'react-icons/hi'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerUniversitySchema } from '@/validation/User/register.university.user.validation'
import { FieldValues } from 'react-hook-form/dist/types'
import { registerDTO } from '@/DTO/User/register.dto.user'
import Radio from '@/components/common/Form/Radio/radio.component'
import { registerUserUniversityDefaultForm } from '@/default/university.register.default copy'
import { Button } from '@mui/material'
import _ from 'lodash'
import { registerUniversities } from '@/pages/api/User/register.user.api'
import { useCookies } from 'react-cookie'
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
    resolver: yupResolver(registerUniversitySchema),
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
    await registerUniversities(customData, cookies.access_token, async () => {
      await whatToDoNextModal({
        action: 'create',
        onConfirm: () => reset(registerUserUniversityDefaultForm),
        onDismiss: () => router.back(),
      })
    })
  }
  useEffect(() => {
    reset(registerUserUniversityDefaultForm)
  }, [])

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} customActions={<CustomActions append={append} />}>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <FormLayout key={field.id} className="relative">
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
            {/* <Select
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
            /> */}
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
          </FormLayout>
        ))}
      </div>
    </FormHeader>
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
