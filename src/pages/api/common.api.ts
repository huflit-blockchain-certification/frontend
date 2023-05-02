import { errorMessage, successMessage } from '@/components/common/Toast/response.toast.component'
import { CRUDInterface, CreateParams, EditParams } from 'models'

interface FormSubmissionModel {
  formData: any
  setLoading: (state: boolean) => void
  setOpen: (state: boolean) => void
  recordId?: string | number
  createRequest?: ({ data, accessToken }: CreateParams) => Promise<any>
  editRequest?: ({ id, data, accessToken }: EditParams) => Promise<any>
  idParam?: string | string[] | undefined
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
  idParam,
}: FormSubmissionModel) => {
  try {
    setLoading(true)
    if (recordId && editRequest) {
      const response = await editRequest({
        id: recordId,
        data: formData,
        accessToken: token,
        idParam,
      })
      if (!response) return
      setOpen(false)
      afterActions.edit(response)
      successMessage('Cập nhật')
      return setOpen(false)
    }
    if (!createRequest) return
    const response = await createRequest({ data: formData, accessToken: token, idParam })
    if (!response) return setOpen(false)
    setOpen(false)
    setLoading(false)
    afterActions.create(response)
    successMessage('Tạo')
  } catch (err) {
    errorMessage()
  }
}
