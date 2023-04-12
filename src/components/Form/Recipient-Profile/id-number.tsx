import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { RecipientProfileApi } from '@/pages/api/Recipient-Profile/recipient-profle.api'
import { Input } from '@/components/common/Form/Input/Input.component'
import { IDNumber } from 'models/IDNumber'
import { IDNumberSchema } from '@/validation/Recipient-Profile/id-number.validation'
import { IDNumberDefault } from '@/default/id-number.default'

function IDNumberForm({ setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<IDNumber>({
    resolver: yupResolver(IDNumberSchema),
    defaultValues: IDNumberDefault,
  })
  const onSubmit = async (data: IDNumber) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: RecipientProfileApi.createIDNumber,
      formData: data,
      setLoading,
      setOpen,
      token: cookies.access_token,
    })
  }

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Input control={control} name="_id" label="Số vào sổ" />
          <Input control={control} name="idNumber" label="Số idNumber" />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

IDNumberForm.Layout = AdminLayout
export default IDNumberForm
