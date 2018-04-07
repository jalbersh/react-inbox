// in src/reducers/messages.js
import {API_ADD_REQUEST_STARTED,
        API_ADD_MESSAGE_SUCCESS,
        API_FETCH_REQUEST_STARTED,
        API_FETCH_MESSAGES_SUCCESS,
        API_UPDATE_REQUEST_STARTED,
        API_UPDATE_MESSAGES_SUCCESS} from '../Utils/actionTypes'

const initialState = {
  all: [],
}

export default (state = initialState, action) => {
  console.log('in Reducers.messages with type',action ? action.type : 'no action',' and state',action)
  if (!action) {
        console.log('No action, returning default state')
        return state
  }
  switch (action.type) {
        case API_ADD_REQUEST_STARTED: return state
        case API_ADD_MESSAGE_SUCCESS: return action.messages
        case API_FETCH_REQUEST_STARTED: return state
        case API_FETCH_MESSAGES_SUCCESS: return action.messages
        case API_UPDATE_REQUEST_STARTED: return state
        case API_UPDATE_MESSAGES_SUCCESS: return action.messages
        default:
            return state
  }
}
