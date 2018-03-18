import {API_ADD_REQUEST_STARTED,
        API_FETCH_REQUEST_STARTED,
        API_FETCH_MESSAGES_SUCCESS,
        API_UPDATE_REQUEST_STARTED
        } from '../Utils/actionTypes'
import commands from '../commands'

export function addMessageInAPI(message) {
        console.log('in action.addMessageInAPI with',message)
    return async (dispatch) => {
        dispatch({ type: API_ADD_REQUEST_STARTED })
        console.log('action.addMessageInAPI, from env, url',process.env.REACT_APP_API_URL)
        let url = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        url += '/api/messages'
        console.log('built url',url)
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(message),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
       })
       console.log('response from addMessageInAPI',response)
       dispatch(fetchMessagesInAPI())
//       dispatch({
//           type: API_ADD_MESSAGE_SUCCESS
//            ,someObject: 'someState'
//       })
    }
}

export function fetchMessagesInAPI() {
        console.log('action.fetchMessagesInAPI,from env, url',process.env.REACT_APP_API_URL)
    return async (dispatch) => {
        dispatch({ type: API_FETCH_REQUEST_STARTED })
        let url = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        url += '/api/messages'
        const response = await fetch(url)
        const json = await response.json()
        try {
            const embedded = json._embedded
            const messages = embedded.messages
            dispatch({
                type: API_FETCH_MESSAGES_SUCCESS,
                messages: messages
            })
            //return this.convertAPItoDisplay(messages)
            //this.setState({messages: messages});
        } catch (Exception) {
            console.log('unable to fetchMessagesInAPI')
            return []
        }
    }
}

export function updateMessagesInAPI(messages, command, value) {
        console.log('in action.updateMessagesInAPI with',messages,'and',value)
    return async (dispatch) => {
        dispatch({ type: API_UPDATE_REQUEST_STARTED })
//        console.log('src/Actions/updateMessages.js, from env, url',process.env.REACT_APP_API_URL)
        let base = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        let url = base + '/api/messages'
        const message = messages[0]
//        console.log('message',message)
        let body = {}
        switch(command) {
            case commands.DELETE:     body = {messageIds: [message.id], command: command }; break;
            case commands.STAR:       body = {messageIds: [message.id], command: command, star: message.starred}; break;
            case commands.READ:       body = {messageIds: [message.id], command: command, read: message.read}; break;
            case commands.UNREAD:     body = {messageIds: [message.id], command: command, read: message.read}; break;
            case commands.ADDLABEL:   if (!value) {return} else {body = {messageIds: [message.id], command: command, label:value}; break;}
            case commands.REMOVELABEL:if (!value) {return} else {body = {messageIds: [message.id], command: command, label:value}; break;}
            default: return
        }
//        console.log('body',body)
//        console.log('built url',url)
        const sbody = JSON.stringify(body)
//        console.log('sbody',sbody)
        const response = await fetch(url,
        {
            method: 'PATCH',
            body: sbody,
            headers: { 'Content-Type': 'application/json' }
        })
        console.log('response from updateMessagesInAPI',response)
        dispatch(fetchMessagesInAPI())
        // if 200 returned, what about messages
//        dispatch({
//            type: API_UPDATE_MESSAGES_SUCCESS
//            ,someObject: 'someState'
////            ,messages: messages
//        })
    }
}
