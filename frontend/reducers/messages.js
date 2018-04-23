import actionTypes from './../actionTypes'
import { messages as messagesConfig } from './../config'


function getDefaultState() {
  let state = {}
  let defaultState = {
    error: null,
    success: null
  }

  messagesConfig.forEach(mc => {
    state[mc] = Object.assign({}, defaultState)
  })

  return state
}

const defaultState = getDefaultState()

export default (state = defaultState, action) => {
  const type = action.type
  const payload = action.payload

  let messageIndex
  let messageType
  let dif = {}

  switch (type) {
    case actionTypes.ADD_MESSAGE:
      let message = payload.message
      messageIndex = payload.messageIndex
      messageType = payload.messageType

      dif[messageIndex] = Object.assign({}, state[messageIndex])
      dif[messageIndex][messageType] = message

      return Object.assign({}, state, dif)
    case actionTypes.DISMISS_MESSAGE:
      messageIndex = payload.messageIndex
      messageType = payload.messageType

      dif[messageIndex] = Object.assign({}, state[messageIndex])
      dif[messageIndex][messageType] = Object.assign({}, state[messageIndex][messageType], { isDissmissed: true })

      return Object.assign({}, state, dif)
    default:
      return state
  }
}