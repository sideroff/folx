import actionTypes from './../actionTypes'

const currentUserKey = 'currentUser'

function getDefaultCurrentUser() {
  return {
    isLoggedIn: false,
    username: null,
    email: null,
    token: null
  }
}

// default current user
let currentUser = getDefaultCurrentUser()

try {
  let localStorageCurrentUser = localStorage.getItem(currentUserKey)

  if (localStorageCurrentUser) {
    localStorageCurrentUser = JSON.parse(localStorageCurrentUser)
    currentUser = localStorageCurrentUser
    currentUser.isLoggedIn = !!currentUser.token
  }
} catch (error) {
  // just dont throw parse exception, if we cant parse, app will assume the user is logged out
}

const defaultState = currentUser

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      state = Object.assign({}, state, action.payload, { isLoggedIn: true })
      setCurrentUserInLocalStorate(state)
      return state
    case actionTypes.LOGIN_FAILURE:
      state = Object.assign({}, state, { isLoggedIn: false })
      setCurrentUserInLocalStorate(state)
      return state
    case actionTypes.LOGOUT:
      state = getDefaultCurrentUser()
      setCurrentUserInLocalStorate(state)
      return state
    default:
      return state
  }
}

function setCurrentUserInLocalStorate(state) {
  console.log('here')
  console.dir(state)
  localStorage.setItem(currentUserKey, JSON.stringify(state))
}