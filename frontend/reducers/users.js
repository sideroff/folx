import actionTypes from './../actionTypes'

const defaultState = {
  isLoggingIn: false
}

export default (state = defaultState, action) => {
  switch (action) {
    case actionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, { isLoggingIn: true })
    default:
      return state

  }
}