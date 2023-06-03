import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Modal as CustomModal } from '@mui/material/'
import { GrClose } from 'react-icons/gr'
interface CustomModalProps {
  open: boolean
  beforeClose?: () => void
  setOpen: (state: boolean) => void
  children: ReactNode
  width?: number
  height?: number
}

export function Modal({ children, open, setOpen, beforeClose, width, height }: CustomModalProps) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    width: { lg: width || 700, md: '60%', sm: '80%', xs: '100%' },
    height: height || 'auto',
    minHeight: 200,
    maxHeight: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    overflowY: 'auto',
  }

  const handleClose = () => {
    if (beforeClose) {
      beforeClose()
    }
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
        <Box sx={style}>
          <div className="w-100 h-100 relative p-8">
            <GrClose
              size={20}
              className="absolute right-2 top-2 cursor-pointer"
              onClick={handleClose}
            />
            {children}
          </div>
        </Box>
      </CustomModal>
    </div>
  )
}
