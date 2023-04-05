import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Modal as CustomModal } from '@mui/material/'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  width: 700,
  minHeight: 600,
  maxHeight: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
}

interface CustomModalProps {
  open: boolean
  beforeClose: () => void
  setOpen: (state: boolean) => void
  children: ReactNode
}

export function Modal({ children, open, setOpen, beforeClose }: CustomModalProps) {
  const handleClose = () => {
    beforeClose()
    setOpen(false)
  }

  return (
    <div>
      <CustomModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </CustomModal>
    </div>
  )
}
