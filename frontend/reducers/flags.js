import actionTypes from './../actionTypes'

const defaultState = {
  isMobileMenuActive: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMobileMenuActive: action.payload })
    default:
      return state
  }
}