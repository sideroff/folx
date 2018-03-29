import actionTypes from './../../actionTypes'
import loginReducer from './login'
import registerReducer from './register'
import searchAdsReducer from './searchAds'

const defaultState = {
  login: loginReducer(),
  register: registerReducer(),
  searchAds: searchAdsReducer()
}

export default (state = defaultState, action) => {
  return {
    login: loginReducer(state.login, action),
    register: registerReducer(state.register, action),
    searchAds: searchAdsReducer(state.searchAds, action),
  }
}