import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Input } from '@/components/common/Form/Input/Input.component'
import { useForm } from 'react-hook-form'
import { VerifyKey } from 'models/VerifyKey'
import { verifyKeyDefault } from '@/default/verify-key'
import { yupResolver } from '@hookform/resolvers/yup'
import { verifyKeySchema } from '@/validation/VerifyKey/verify-key.validation'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator.component'
import { VerifyKeyApi } from '@/pages/api/VerifyKey/verify-key.api'
import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { Toast } from '@/components/common/Toast/response.component'
import translate from 'translate'
import { DACDetail } from '@/pages/dac/[idDAC]'
import { Modal } from '@/components/common/Modal/modal.component'

export default function VerifyKeyForm() {
  const [loading, setLoading] = useState(false)
  const [dac, setDAC] = useState()
  const [open, setOpen] = useState(false)
  const { control, handleSubmit } = useForm<VerifyKey>({
    defaultValues: verifyKeyDefault,
    resolver: yupResolver(verifyKeySchema),
  })
  const submit = async (data: VerifyKey) => {
    ;(async () => {
      try {
        setLoading(true)
        const verifyKey = await VerifyKeyApi.verifyKey({ data })
        if (verifyKey && verifyKey.data && verifyKey.data.success) {
          Toast.fire({ title: await translate(verifyKey.message, 'vi'), icon: 'success' })
        }
        setDAC(verifyKey?.data?.data)
        setOpen(true)
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        errorMessage(err)
      }
    })()
  }
  if (loading) {
    return <LoadingIndicator />
  }
  return (
    <div className="">
      <form
        className="flex flex-col gap-2 px-14 py-10 lg:px-16 lg:py-12 md:px-4 md:py-4 sm:px-28 sm:py-20  shadow rounded hover:shadow-lg mx-0 
        lg:mx-80 md:mx-0 sm:mx-0"
        onSubmit={handleSubmit(submit)}
      >
        <div className="font-bold text-red-600 text-2xl text-center">
          Tra cứu văn bằng chứng chỉ
        </div>
        <Input control={control} label="Tên" name="name" required fullWidth />
        <Input control={control} label="Mã sinh viên / CMND" name="identity" required fullWidth />
        <Input control={control} label="Mã" name="key" required fullWidth />
        <Button type="submit" variant="outlined">
          Tra cứu
        </Button>
      </form>
      {dac && (
        <Modal open={open} setOpen={setOpen}>
          <DACDetail DAC={dac} pdfOptions={{ enable: true }} />
        </Modal>
      )}
    </div>
  )
}
