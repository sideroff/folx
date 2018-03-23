import actionTypes from './../actionTypes'

// default current user
let currentUser = {
  isLoggedIn: false,
  username: null,
  email: null
}

try {
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
} catch (error) {
  // just dont throw parse exception, if we cant parse, app will assume the user is logged out
}

const defaultState = currentUser

export default (state = defaultState, action) => {
  switch (action) {
    case actionTypes.CURRENT_USER_CHANGE:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}