import actionTypes from './../actionTypes'
import forms from './../forms'


function getDefaultState(forms) {
  let defaultState = {}

  let formNames = Object.keys(forms)

  for (let fn of formNames) {
    if (!forms.hasOwnProperty(fn)) continue;

    let form = forms[fn]
    let formFields = form.fields.map(f => f.name)

    defaultState[form.name] = {}

    formFields.forEach(f => {
      defaultState[form.name][f] = ''
    })
  }

  return defaultState
}

const defaultState = getDefaultState(forms)

export default (state = defaultState, action) => {
  let payload = action.payload
  switch (action.type) {
    case actionTypes.FORM_FIELD_CHANGE:
      if (state[payload.form] && state[payload.form].hasOwnProperty(payload.field.name)) {
        state[payload.form][payload.field.name] = payload.field.value
      }
      return state
    default:
      return state
  }
}
