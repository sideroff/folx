import actionTypes from './../../actionTypes'
import loginReducer from './login'
import registerReducer from './register'

const defaultState = {
  login: loginReducer(),
  register: registerReducer()
}

export default (state = defaultState, action) => {
  return {
    login: loginReducer(state.login, action),
    register: registerReducer(state.register, action)
  }
}