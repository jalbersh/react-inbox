// in src/reducers/messages.js
import {API_ADD_REQUEST_STARTED,
        API_ADD_MESSAGE_SUCCESS,
        API_FETCH_REQUEST_STARTED,
        API_FETCH_MESSAGES_SUCCESS,
        API_UPDATE_REQUEST_STARTED,
        API_UPDATE_MESSAGES_SUCCESS,
        SELECT_ALL_STARTED,
        SELECT_ALL_SUCCESS,
        UPDATE_REQUEST_STARTED
        } from '../Utils/actionTypes'

const initialState = {
  all: [],
}

export default (state = initialState, action) => {
//  console.log('in Reducers.messages with type',action ? action.type : 'no action',' and state',action)
  if (!action) {
        console.log('No action, returning default state')
        return state
  }
  switch (action.type) {
        case API_ADD_REQUEST_STARTED:return state
        case API_ADD_MESSAGE_SUCCESS: return action.messages
        case API_FETCH_REQUEST_STARTED: return state
        case API_FETCH_MESSAGES_SUCCESS: return action.messages
        case API_UPDATE_REQUEST_STARTED: return state
        case API_UPDATE_MESSAGES_SUCCESS: return action.messages
        case SELECT_ALL_STARTED:
                        let messages = action.messages
                        const check = action.select
                        let selectedMessages = messages.map(function(message) {
                            if (!check) {
                                message.selected = false
                                message.checked = 'off'
                            } else {
                                message.selected = true
                                message.checked = 'on'
                            }
//                            dispatch(updateMessages (messages, message, check ? commands.SELECT : commands.UNSELECT))
                            return message
                        })
                        return selectedMessages
        case SELECT_ALL_SUCCESS: return action.messages
        case UPDATE_REQUEST_STARTED:
               let curMessages = action.messages
               let msgToFind = curMessages.find((msg) => {
                   return msg === action.message
               })
               let newMessages = []
               if (msgToFind) {
                   let msgIndex = curMessages.indexOf(msgToFind)
                   newMessages = [
                        ...curMessages.slice(0, msgIndex),
                        action.message,
                        ...curMessages.slice(msgIndex + 1)
                   ]
               } else {
                   newMessages = [
                        ...curMessages, action.message
                   ]
               }
               return newMessages
        default:
            return state
  }
}
