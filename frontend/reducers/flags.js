import actionTypes from './../actionTypes'

const defaultState = {
  isMobileMenuActive: false,
  activeAuthenticationForm: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMobileMenuActive: action.payload })
    case actionTypes.TOGGLE_AUTHENTICATION_FORM:
      return Object.assign({}, state, { activeAuthenticationForm: action.payload })
    default:
      return state
  }
}