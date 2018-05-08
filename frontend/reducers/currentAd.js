import actionTypes from './../actionTypes'

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_ADD_BY_ID_RESPONSE:
      return action.payload || {}
    default:
      return state
  }
}