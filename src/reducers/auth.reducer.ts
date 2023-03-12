import { SET_ACCESS_TOKEN } from '@/constants'

const initialState = {
  accessToken: '',
}

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      }
    default:
      return { ...state }
  }
}
