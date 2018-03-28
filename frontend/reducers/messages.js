import actionTypes from './../actionTypes'

// messages will be identified by actionTypes
const defaultState = {}

export default (state = defaultState, action) => {
  let stateAddition = {}
  switch (action.type) {
    case actionTypes.DISMISS_MESSAGE:
      if (state[action.payload]) {
        stateAddition[action.payload] = ''
      }
      return Object.assign({}, state, stateAddition)
    case actionTypes.REGISTER_FAILURE:
      stateAddition[actionTypes.REGISTER_FAILURE] = action.payload
      return Object.assign({}, state, stateAddition)
    default:
      return state
  }
}