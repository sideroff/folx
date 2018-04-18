import actionTypes from './../../actionTypes'
import forms from './../../forms'

let formFields = forms.adCreate.fields.map(f => f.name)

let defaultState = {}
formFields.forEach(f => {
  defaultState[f] = ''
})

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.AD_CREATE_FORM_FIELD_CHANGE:
      let dif = {}
      dif[action.payload.name] = action.payload.value
      return Object.assign({}, state, dif)
    default:
      return state
  }
}