import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { FormProps } from 'models'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { RegistrationNumber } from 'models/RegistrationNumber'
import { registrationNumberDefault } from '@/default/registration-number.default'
import { RecipientProfileApi } from '@/pages/api/Recipient-Profile/recipient-profle.api'
import { Input } from '@/components/common/Form/Input/Input.component'
import { registrationNumberSchema } from '@/validation/Recipient-Profile/registration-number.validation'

function RegistrationNumberForm({ setOpen, afterActions, recordId, idParam }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, setValue } = useForm<RegistrationNumber>({
    resolver: yupResolver(registrationNumberSchema),
    defaultValues: registrationNumberDefault,
  })

  useEffect(() => {
    if (!recordId) return
    setValue('idDAC', recordId)
  }, [recordId, setValue])

  const onSubmit = async (data: RegistrationNumber) => {
    commonSubmissionHandler({
      idParam,
      afterActions,
      editRequest: RecipientProfileApi.createRegistrationNumber,
      formData: [data],
      setLoading,
      setOpen,
      token: cookies.access_token,
      exceptionEdit: true,
    })
  }

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Input control={control} name="idDAC" label="Số vào sổ" />
          <Input control={control} name="registrationNumber" label="Số hiệu" />
        </FormLayout>
      </div>
    </FormHeader>
  )
}

RegistrationNumberForm.Layout = AdminLayout
export default RegistrationNumberForm
