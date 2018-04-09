// src/reducers/index
import { combineReducers } from 'redux'
import messages from './messages'
import message from './message'

export default combineReducers({
    messages,message
})
