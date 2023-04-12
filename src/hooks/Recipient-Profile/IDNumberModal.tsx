import IDNumberForm from '@/components/Form/Recipient-Profile/id-number'
import { Modal } from '@/components/common/Modal/modal.component'
import { afterActions } from '@/utils/afterActions.util'
import { Button } from '@mui/material'
import { CRUDInterface } from 'models'
import React, { useState } from 'react'

export interface IDNumberProps {
  idParam: string | string[] | undefined
  crudOperation: CRUDInterface
}

export default function IDNumberModal({ idParam, crudOperation }: IDNumberProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Tạo số vào sổ
      </Button>
      <Modal open={open} setOpen={setOpen}>
        <IDNumberForm
          setOpen={setOpen}
          afterActions={afterActions(crudOperation)}
          idParam={idParam}
        />
      </Modal>
    </>
  )
}
