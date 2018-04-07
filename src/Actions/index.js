import {API_ADD_REQUEST_STARTED,
        API_FETCH_REQUEST_STARTED,
        API_FETCH_MESSAGES_SUCCESS,
        API_UPDATE_REQUEST_STARTED,
        API_UPDATE_MESSAGES_SUCCESS
        } from '../Utils/actionTypes'
import commands from '../commands'

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function addMessageInAPI(message) {
    return async (dispatch) => {
        dispatch({ type: API_ADD_REQUEST_STARTED })
        let url = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        url += '/api/messages'
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(message),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
       })
       handleErrors(response)
       dispatch(fetchMessagesInAPI())
    }
}

//function convertAPItoDisplay(messages) {
//   console.log('in convertAPItoDisplay')
//   return !messages ? [] : messages.map((message) => {
//        return {...message,selected:false,checked:'off'}
//   })
//}
//
export function fetchMessagesInAPI() {
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
        } catch (Exception) {
            console.log('unable to fetchMessagesInAPI')
            return []
        }
    }
}

export function updateMessagesInAPI(messages, command, value) {
    return async (dispatch) => {
        dispatch({ type: API_UPDATE_REQUEST_STARTED })
        let base = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        let url = base + '/api/messages'
        const message = messages[0]
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
        const sbody = JSON.stringify(body)
        const response = await fetch(url,
        {
            method: 'PATCH',
            body: sbody,
            headers: { 'Content-Type': 'application/json' }
        })
        handleErrors(response)
        dispatch(fetchMessagesInAPI())
        // if 200 returned, what about messages
    }
}

export function countNumSelected(messages) {
    return async (dispatch) => {
//        console.log('in action.countNumSelected')
        var count = messages && messages.length>0 ? messages.reduce(function(count, message) {
            return !!message.selected ? count+1 : count
        }, 0) : 0
        return count
    }
}

export function selectAll(messages,check) {
    return async (dispatch) => {
        const countSelected = messages ? countNumSelected(messages) : 0
                messages = messages.map(function(message) {
        console.log('inner countSelected',countSelected)
                    if (!check) {
                        message.selected = false
                        message.checked = 'off'
                    } else {
                        message.selected = true
                        message.checked = 'on'
                    }
                    dispatch(updateMessages (messages, message, check ? commands.SELECT : commands.UNSELECT))
                    return message
                })
    }
}

function unselectAll(messages) {
    console.log('in unselectAll with numSelected',countNumSelected(messages))
    return async (dispatch) => {
        const countSelected = messages ? countNumSelected(messages) : 0
                messages = messages.map(function(message) {
                    if (countSelected > 0) {
                        message.selected = false
                        message.checked = 'off'
                    } else {
                        message.selected = true
                        message.checked = 'on'
                    }
                    dispatch(updateMessages (messages, message, commands.UNSELECT))
                    return message
                })
    }
}

export function markRead(messages) {
    console.log('in action markRead',messages)
    return async (dispatch) => {
        messages.filter(function(message) {
             if (!!message.selected) {
                 message.read = true
                 dispatch(updateMessagesInAPI([message],commands.READ))
                 message.selected = false
                 dispatch(updateMessages (messages, message, commands.UNSELECT))
             }
             return message
        },this)
        unselectAll()
    }
}

export function markUnread(messages) {
    return async (dispatch) => {
        messages.filter(function(message) {
             if (!!message.selected) {
                 message.read = false
                 dispatch(updateMessagesInAPI([message],commands.UNREAD))
                 message.selected = false
                 dispatch(updateMessages (messages, message, commands.UNSELECT))
             }
             return message
        },this)
        unselectAll()
    }
}

export function checkMessage(messages,message,selected) {
    return async (dispatch) => {
        message.selected = selected
        dispatch(updateMessages(messages,message,!!selected ? commands.SELECT : commands.UNSELECT))
    }
}

export function starMessage (messages,message,star) {
    return async (dispatch) => {
        message.starred = star
        dispatch(updateMessages(messages,message,commands.STAR))
    }
}

export function updateMessages (messages, message, command) {
    return async (dispatch) => {
       let curMessages = messages
       let msgToFind = curMessages.find((msg) => {
           return msg === message
       })
       let newMessages = []
       if (msgToFind) {
           let msgIndex = curMessages.indexOf(msgToFind)
           newMessages = [
                ...curMessages.slice(0, msgIndex),
                message,
                ...curMessages.slice(msgIndex + 1)
           ]
       } else {
           newMessages = [
                ...curMessages, message
           ]
       }
       if (command === commands.ADD) {
            dispatch(addMessageInAPI(message))
       } else if (command !== commands.SELECT &&
                  command !== commands.UNSELECT &&
                  command !== commands.CHECK &&
                  command !== commands.UNCHECK)
       {
            dispatch(updateMessagesInAPI([message],command,message.starred))
       }
       dispatch({type: API_UPDATE_MESSAGES_SUCCESS, messages: newMessages})
    }
}

export function deleteSelected(messages) {
    return async (dispatch) => {
        messages.filter(function( message ) {
            if (!!message.selected) {
                dispatch(updateMessagesInAPI([message],commands.DELETE))
                return false
            }
            return true

        }, this)
    }
}

export function removeLabels(messages,label) {
    return async (dispatch) => {
        messages.map(function(message) {
                    if (message.selected === true) {
                        let labels = message.labels
                        if (labels && labels.length>0) {
                            let newLabels = []
                            let lblIndex = labels.indexOf(label)
                            if (lblIndex !== -1) {
                               newLabels = [
                                    ...labels.slice(0, lblIndex),
                                    ...labels.slice(lblIndex + 1)
                               ]
                               message.labels = newLabels
                            }
                        }
                        dispatch(updateMessagesInAPI([message],commands.REMOVELABEL,label))
                    }
                    return message
                },this)
    }
}

export function applyLabels(messages, label) {
    return async (dispatch) => {
        messages.map(function(message) {
                    if (message.selected === true) {
                        message.labels.push(label)
                        dispatch(updateMessagesInAPI([message],commands.ADDLABEL,label))
                    }
                    return message
                },this)
    }
}