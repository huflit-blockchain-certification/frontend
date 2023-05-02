import { combineReducers } from 'redux'

import { authReducer } from './auth.reducer'
import { checkedFieldReducer } from './check-field.reducer'

const rootReducer = combineReducers({
  authReducer,
  checkedFieldReducer,
})

export default rootReducer
