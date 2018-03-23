import actionTypes from './../actionTypes'

const defaultState = {
  isMobileMenuActive: false,
  onAuthRedirect: '/'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMobileMenuActive: action.payload })
    case actionTypes.CHANGE_ON_AUTH_REDIRECT:
      return Object.assign({}, state, { onAuthRedirect: action.payload })
    default:
      return state
  }
}