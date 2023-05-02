import { HiPencil } from 'react-icons/hi'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import * as React from 'react'
import { dateFormat } from '@/utils/formatter.util'
import { CRUDInterface } from 'models'
import { Button } from '@mui/material'
import IDNumberForm from '@/components/Form/Recipient-Profile/id-number.form'
import { Modal } from '@/components/common/Modal/modal.component'
import { afterActions } from '@/utils/afterActions.util'
import RegistrationNumberForm from '@/components/Form/Recipient-Profile/registration-number.form'
import CheckPermissions from '@/components/common/Auth/check-permissions'
import { DOET_ROLE, UNIVERSITY_ROLE } from '@/constants'

interface ColumnsProps {
  open?: boolean
  setOpen: (state: boolean) => void
  setRecordId: any
  idParam: string | string[] | undefined
  crudOperation: CRUDInterface
}

export default function useRecipientProfileColumn({
  setOpen,
  setRecordId,
  idParam,
  crudOperation,
}: ColumnsProps) {
  const [openIDNumberModal, setOpenIDNumberModal] = React.useState(false)
  const [openRegistrationNumberModal, setOpenRegistrationNumberModal] = React.useState(false)
  const columns: any = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'iSt',
      headerName: 'Mã học sinh',
      width: 150,
    },
    {
      field: 'iU',
      headerName: 'Mã trường',
      width: 150,
    },
    {
      field: 'studentName',
      headerName: 'Tên học sinh',
      width: 150,
    },
    {
      field: 'idNumber',
      headerName: 'Số vào sổ',
      renderCell(params: any) {
        return (
          <>
            {params?.value ? (
              <AiOutlineCheckCircle size={18} />
            ) : (
              <AiOutlineCloseCircle size={18} />
            )}
          </>
        )
      },
    },
    {
      field: 'registrationNum',
      headerName: 'Số hiệu',
      renderCell(params: any) {
        return (
          <>
            {params?.value ? (
              <AiOutlineCheckCircle size={18} />
            ) : (
              <AiOutlineCloseCircle size={18} />
            )}
          </>
        )
      },
    },
    {
      field: 'universityName',
      headerName: 'Trường',
      width: 150,
    },
    { field: 'year', headerName: 'Năm tốt nghiệp', width: 150 },

    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 100,
      renderCell: (params: any) => <div>{dateFormat(params?.value)}</div>,
    },
    {
      field: 'options',
      headerName: 'Tùy chỉnh',
      width: 300,
      renderCell: (params: any) => {
        return (
          <div className="flex gap-3 items-center">
            <HiPencil
              className="text-xl cursor-pointer"
              onClick={() => {
                setOpen(true)
                setRecordId(params?.id)
              }}
            />
            {!params?.row?.idNumber && (
              <CheckPermissions requireRoles={[UNIVERSITY_ROLE]}>
                <Button
                  variant="outlined"
                  onClick={() => setOpenIDNumberModal(true)}
                  disabled={!params?.row?.registrationNum && true}
                >
                  Sổ vào sổ
                </Button>
                <Modal open={openIDNumberModal} setOpen={setOpenIDNumberModal}>
                  <IDNumberForm
                    recordId={params?.id}
                    setOpen={setOpenIDNumberModal}
                    afterActions={afterActions(crudOperation)}
                    idParam={idParam}
                  />
                </Modal>
              </CheckPermissions>
            )}
            <CheckPermissions requireRoles={[DOET_ROLE]}>
              <Button variant="outlined" onClick={() => setOpenRegistrationNumberModal(true)}>
                Số hiệu
              </Button>

              <Modal open={openRegistrationNumberModal} setOpen={setOpenRegistrationNumberModal}>
                <RegistrationNumberForm
                  recordId={params?.id}
                  setOpen={setOpenRegistrationNumberModal}
                  afterActions={afterActions(crudOperation)}
                  idParam={idParam}
                />
              </Modal>
            </CheckPermissions>
          </div>
        )
      },
    },
  ]
  return { columns }
}
