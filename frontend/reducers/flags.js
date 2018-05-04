import actionTypes from './../actionTypes'

const defaultState = {
  isMobileMenuActive: false,
  onAuthRedirect: '/',
  isLoadingAd: false,
  adGetSkip: 0,
  adGetLimit: 20
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMobileMenuActive: action.payload })
    case actionTypes.CHANGE_ON_AUTH_REDIRECT:
      return Object.assign({}, state, { onAuthRedirect: action.payload })
    case actionTypes.CHANGE_IS_LOADING_AD:
      return Object.assign({}, state, { isLoadingAd: action.payload })
    case actionTypes.UPDATE_CARD_GET_SKIP:
      return Object.assign({}, state, { cardGetSkip: action.payload })
    case actionTypes.REMOVE_ADS:
      return Object.assign({}, state, { cardGetSkip: 0 })
    default:
      return state
  }
}