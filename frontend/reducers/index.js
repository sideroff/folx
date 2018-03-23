import { combineReducers } from 'redux'

import users from './users'
import flags from './flags'
import forms from './forms'


export default combineReducers({
  users,
  flags,
  forms
})