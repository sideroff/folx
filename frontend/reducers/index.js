import { combineReducers } from 'redux'

import currentUser from './currentUser'
import flags from './flags'
import forms from './forms'
import messages from './messages'
import ads from './ads'
import currentAd from './currentAd'



export default combineReducers({
  currentUser,
  flags,
  forms,
  messages,
  ads,
  currentAd,
})