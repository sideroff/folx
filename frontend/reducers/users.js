import actionTypes from './../actionTypes'

const defaultState = {
  current: null,
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