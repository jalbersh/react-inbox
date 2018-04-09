// in src/reducers/message.js
import {
        API_ADD_REQUEST_STARTED,
        API_ADD_MESSAGE_SUCCESS,
        REMOVE_LABEL_STARTED
        } from '../Utils/actionTypes'

const initialState = {
  all: {},
}

export default (state = initialState, action) => {
//  console.log('in Reducers.message with type',action ? action.type : 'no action',' and state',action)
  if (!action) {
        console.log('No action, returning default state')
        return state
  }
  switch (action.type) {
        case API_ADD_REQUEST_STARTED:
            const partial = action.partial
            let message = { 'labels': [],
                          'checked': 'off',
                          'selected': false,
                          'read': false,
                          'starred': false,
                          'subject': partial.subject,
                          'body': partial.body }
            return message
        case API_ADD_MESSAGE_SUCCESS: return action.message
        case REMOVE_LABEL_STARTED:
                                let label = action.label
                                message = action.message
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
                                return message
        default:
            return state
  }
}
