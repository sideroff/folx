import { combineReducers } from 'redux'

import users from './users'
import flags from './flags'


export default combineReducers({
  users,
  flags
})