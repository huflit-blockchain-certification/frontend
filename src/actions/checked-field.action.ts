import { SET_CHECKED_FIELD } from '@/constants/'

const setCheckedField = (payload: any) => ({
  type: SET_CHECKED_FIELD,
  payload,
})

export { setCheckedField }
