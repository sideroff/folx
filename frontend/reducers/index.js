import { combineReducers } from 'redux'

import currentUser from './currentUser'
import flags from './flags'
import forms from './forms'


export default combineReducers({
  currentUser,
  flags,
  forms
})