import actionTypes from './../actionTypes'

// default current user
let currentUser = {
  isLoggedIn: false,
  username: null,
  email: null
}

try {
  let localStorageCurrentUser = localStorage.getItem('currentUser')
  if (localStorageCurrentUser) {
    currentUser = JSON.parse(localStorageCurrentUser)
  }

} catch (error) {
  // just dont throw parse exception, if we cant parse, app will assume the user is logged out
}

const defaultState = currentUser

export default (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
      return Object.assign({}, state, action.payload, { isLoggedIn: true })
    case actionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, { isLoggedIn: false })
    default:
      return state
  }
}