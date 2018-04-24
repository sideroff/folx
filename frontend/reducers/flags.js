import actionTypes from './../actionTypes'

const defaultState = {
  isMobileMenuActive: false,
  onAuthRedirect: '/',
  isLoadingAd: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMobileMenuActive: action.payload })
    case actionTypes.CHANGE_ON_AUTH_REDIRECT:
      return Object.assign({}, state, { onAuthRedirect: action.payload })
    case actionTypes.CHANGE_IS_LOADING_AD:
      return Object.assign({}, state, { isLoadingAd: action.payload })
    default:
      return state
  }
}