import RegistrationNumberForm from '@/components/Form/Recipient-Profile/registration-number.form'
import { Modal } from '@/components/common/Modal/modal.component'
import { afterActions } from '@/utils/afterActions.util'
import { Button } from '@mui/material'
import { CRUDInterface } from 'models'
import React, { useState } from 'react'

export interface RegistrationNumberProps {
  idParam: string | string[] | undefined
  crudOperation: CRUDInterface
  recordId?: string
}

export default function RegistrationNumberModal({
  idParam,
  crudOperation,
  recordId,
}: RegistrationNumberProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Tạo số hiệu
      </Button>
      <Modal open={open} setOpen={setOpen}>
        <RegistrationNumberForm
          recordId={recordId}
          setOpen={setOpen}
          afterActions={afterActions(crudOperation)}
          idParam={idParam}
        />
      </Modal>
    </>
  )
}
