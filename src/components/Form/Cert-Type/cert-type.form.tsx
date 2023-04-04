import { Input } from '@/components/common/Form/Input/Input.component'
import { AdminLayout, FormHeader, FormLayout } from '@/layouts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Radio from '@/components/common/Form/Radio/radio.component'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { CertType, FormProps } from 'models'
import { certTypeOptions } from '@/static/certType'
import { commonSubmissionHandler } from '@/pages/api/common.api'
import { CertTypeSchema } from '@/validation/Cert-type/create.cert-type.validation'
import { CertTypeApi } from '@/pages/api/Cert-Type/cert-type.api'
import { certTypeDefaultForm } from '@/default/cert-type.default'

function CertTypeForm({ recordId, setOpen, afterActions }: FormProps) {
  const [cookies] = useCookies(['access_token'])
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, watch } = useForm<CertType>({
    resolver: yupResolver(CertTypeSchema),
    defaultValues: certTypeDefaultForm,
  })
  const watchType = watch('type')
  const onSubmit = async (data: CertType) => {
    commonSubmissionHandler({
      afterActions,
      createRequest: CertTypeApi.createCertType,
      editRequest: CertTypeApi.editCertType,
      formData: data,
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
      const certType = await CertTypeApi.detailCertType({
        id: recordId,
        accessToken: cookies.access_token,
      })
      if (!certType) return
      reset(certType.data.data)
      setLoading(false)
    })()
  }, [recordId])

  return (
    <FormHeader onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="w-full">
        <FormLayout className="relative">
          <Radio label="Loại" name="type" control={control} options={certTypeOptions} />
          <Input name="name" label="Tên bằng" control={control} required />
          {watchType === 'CERTIFICATE' && (
            <Input name="level" label="Cấp bậc" type="number" control={control} required />
          )}
        </FormLayout>
      </div>
    </FormHeader>
  )
}

CertTypeForm.Layout = AdminLayout
export default CertTypeForm
