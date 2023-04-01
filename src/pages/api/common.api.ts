import { successMessage } from '@/components/common/Toast/response.toast.component'
import { CRUDInterface } from 'models'

interface FormSubmissionModel {
  formData: any
  setLoading: (state: boolean) => void
  setOpen: (state: boolean) => void
  recordId?: string | number
  createRequest: (data: any, accessToken: string) => Promise<any>
  editRequest: (id: string | number, data: any, accessToken: string) => Promise<any>
  afterActions: CRUDInterface
  token: string
}
export const commonSubmissionHandler = async ({
  formData,
  setLoading,
  afterActions,
  createRequest,
  editRequest,
  setOpen,
  recordId,
  token,
}: FormSubmissionModel) => {
  setLoading(true)
  if (recordId) {
    const response = await editRequest(recordId, formData, token)
    if (!response) return
    setOpen(false)
    afterActions.edit(response)
    successMessage('Cập nhật')
    return setOpen(false)
  }
  const response = await createRequest(formData, token)
  if (!response) return setOpen(false)
  setOpen(false)
  setLoading(false)
  afterActions.create(response)
  successMessage('Tạo')
}
