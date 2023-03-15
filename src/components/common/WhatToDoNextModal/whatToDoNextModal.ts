import Swal, { SweetAlertIcon } from 'sweetalert2'

interface whatToDoNextModalParams {
  // icon: SweetAlertIcon
  action: string
  onConfirm: () => void
  onDismiss: () => void
}
export const whatToDoNextModal = async ({
  action,
  onConfirm,
  onDismiss,
}: whatToDoNextModalParams) => {
  await Swal.fire({
    title: `${action.charAt(0).toUpperCase() + action.slice(1)} Successfully`,
    icon: 'success',
  })
  const result = await Swal.fire({
    title: 'What to do next?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: action === 'update' ? 'Continue modify !' : 'Continue create...',
    cancelButtonText: 'Go back !',
    reverseButtons: true,
  })
  if (result.isConfirmed) {
    if (action === 'update') return
    onConfirm()
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    onDismiss()
  }
}
