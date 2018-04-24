import actionTypes from './../actionTypes'

const defaultState = {}

function getTimestampedObject(obj = {}) {
  obj.loadedTimestamp = Date.now()
  return obj
}

function getAdDoesNotExistDefaultState() {
  return Object.assign(getTimestampedObject(), { exists: false })
}

export default (state = defaultState, action) => {
  let payload = action.payload
  let dif = {}

  switch (action.type) {
    case actionTypes.UPDATE_CACHED_AD:
      if (payload === null) {
        payload = getAdDoesNotExistDefaultState()
      }
      dif[payload._id] = payload
      return Object.assign({}, state, dif)
    case actionTypes.REMOVE_CACHED_AD:
      dif = Object.assign({}, state)
      delete dif[payload._id]
      return dif
    default:
      return state
  }
}