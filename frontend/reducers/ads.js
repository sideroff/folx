import actionTypes from './../actionTypes'

const defaultState = []

export default (state = defaultState, action) => {
  let payload = action.payload
  let newState

  switch (action.type) {
    case actionTypes.ADD_ADS:
      if (Array.isArray(payload)) {
        //note: payload might contain ads that already exist in state if any new ones were created between requests
        newState = [...state, ...payload]
      } else {
        newState = [...state, payload]
      }
      return newState
    default:
      return state
  }
}