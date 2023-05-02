import { SET_CHECKED_FIELD, fieldShareExtend } from '@/constants/'

const shareExtendObj = fieldShareExtend.reduce((obj: any, key) => {
  obj[key] = false
  return obj
}, {})

const initialState = {
  checkedFields: shareExtendObj,
}

export const checkedFieldReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CHECKED_FIELD:
      return {
        ...state,
        checkedFields: action.payload,
      }
    default:
      return { ...state }
  }
}
