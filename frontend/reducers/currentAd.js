import actionTypes from './../actionTypes'

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_AD:
      return action.payload || defaultState
    default:
      return state
  }
}