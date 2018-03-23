import actionTypes from './../../actionTypes'

const defaultState = {
  username: '',
  password: '',
  confirmPassword: ''
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.REGISTER_FORM_FIELD_CHANGE:
      let dif = {}
      dif[action.payload.name] = action.payload.value
      return Object.assign({}, state, dif)
    default:
      return state
  }
}