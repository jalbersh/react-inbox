import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages'
import commands from './commands'

class App extends Component {
    constructor(props) {
        super(props)
        this.state={messages: this.props.messages}
        this.selectStar = this.selectStar.bind(this)
        this.selectCheck = this.selectCheck.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
        this.changeMessages = this.changeMessages.bind(this)
        this.deleteSelected = this.deleteSelected.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.countNumSelected = this.countNumSelected.bind(this)
        this.markRead = this.markRead.bind(this)
        this.markUnread = this.markUnread.bind(this)
        this.removeLabels = this.removeLabels.bind(this)
        this.applyLabels = this.applyLabels.bind(this)
        this.fetchMessagesFromAPI = this.fetchMessagesFromAPI.bind(this)
        this.addMessageToAPI = this.addMessageToAPI.bind(this)
//        this.processMessageInAPIInAPI = this.processMessageInAPI.bind(this)
        this.makeChangeInAPI = this.makeChangeInAPI.bind(this)
        this.convertAPItoDisplay = this.convertAPItoDisplay.bind(this)
        this.convertDisplaytoAPI = this.convertDisplaytoAPI.bind(this)
//        this.deleteById = this.deleteById.bind(this)
    }

    async componentDidMount() {
        console.log('in Messages.componentDidMount')
        const messages = await this.fetchMessagesFromAPI()
        console.log('got converted messages from API',messages)
        this.setState({messages: messages})
    }

    convertAPItoDisplay = (messages) => {
        console.log('in convertAPItoDisplay')
        return !messages ? [] : messages.map((message) => {
            return {...message,selected:false,checked:'off'}
        })
    }

    convertDisplaytoAPI = (message) => {
           let url = process.env.REACT_APP_API_URL || '//http://localhost:8082'
           const newMessage = {              _links: {
                                                self: {
                                                  href: `${url}/api/messages/${message.id}`
                                                },
                                              },
                                              id: `${message.id}`,
                                              subject: `${message.subject}`,
                                              starred: `${message.starred}`,
                                              read: `${message.read}`,
                                              labels: `${message.labels}`,
                              }
            return newMessage
    }

    fetchMessagesFromAPI = async () => {
        console.log('fetchMessagesFromAPI,from env, url',process.env.REACT_APP_API_URL)
        let url = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        url += '/api/messages'
        const response = await fetch(url)
        const json = await response.json()
        try {
            const embedded = json._embedded
            const messages = embedded.messages
            return this.convertAPItoDisplay(messages)
            //this.setState({messages: messages});
        } catch (Exception) {
            console.log('unable to get messages')
            return []
        }
    }

    addMessageToAPI = async (message) => {
        console.log('in addMessageToAPI with',message)
        console.log('addMessageToAPI, from env, url',process.env.REACT_APP_API_URL)
        let url = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        url += '/api/messages'
        console.log('built url',url)
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(message),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'default'
       })
        console.log('response from addMessageToAPI',response)
    }

    makeChangeInAPI = async (messages, command, value) => {
        console.log('in makeChangeInAPI with',messages,'and',value)
//        const newMessage = this.convertDisplaytoAPI(message)
//        console.log('message to be deleted',newMessage)
        console.log('makeChangeInAPI, from env, url',process.env.REACT_APP_API_URL)
        let base = process.env.REACT_APP_API_URL || 'http://localhost:8082'
        let url = base + '/api/messages'
//        const messageIds = messages ? messages.map((message) => { return message.id }) : []
        const message = messages[0]
        console.log('message',message)
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
        console.log('body',body)
//        console.log('messageIds',messageIds)
        console.log('built url',url)
        const sbody = JSON.stringify(body)
        console.log('sbody',sbody)
        const response = await fetch(url,
        {
            method: 'PATCH',
            body: sbody,
            headers: { 'Content-Type': 'application/json' }
        })
        console.log('response from makeChangeInAPI',response)
    }

    changeMessages(newMessages) {
        console.log('in changeMessages with',newMessages)
        this.setState({messages: newMessages})
    }

    updateMessages (message, command) {
       let curMessages = this.state.messages
       console.log('in App.updateMessages with',message)
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
//       console.log('in App.updateMessages calling setState with newMessages=',newMessages)
       if (command === commands.ADD) {
            this.addMessageToAPI(message)
       } else if (command !== commands.SELECT &&
                  command !== commands.UNSELECT &&
                  command !== commands.CHECK &&
                  command !== commands.UNCHECK)
       {
            this.makeChangeInAPI([message],command,message.starred)
       }
       this.setState({messages: newMessages})
    }

    countNumSelected(messages) {
        var count = messages.reduce(function(count, message) {
            return !!message.selected ? count+1 : count
        }, 0);
        return count
    }

    selectAll(e) {
        e.preventDefault()
        let messages = this.state.messages
//        console.log('in Toolbar.selectAll with',messages)
        const countSelected = messages ? this.countNumSelected(messages) : 0
                messages = this.state.messages.map(function(message) {
                    if (countSelected > 0) {
                        message.selected = false
                        message.checked = 'off'
                    } else {
                        message.selected = true
                        message.checked = 'on'
                    }
                    return message
                })
        this.setState({messages: messages});
    }

    removeLabels(e) {
        e.preventDefault()
        const label = e.target.value
        let newMessages = this.state.messages.map(function(message) {
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
                        this.makeChangeInAPI([message],commands.REMOVELABEL,label)
                    }
                    return message
                },this)
        this.setState({messages: newMessages});
    }

    applyLabels(e) {
        e.preventDefault()
        const label = e.target.value
        let newMessages = this.state.messages.map(function(message) {
                    if (message.selected === true) {
                        message.labels.push(label)
                        this.makeChangeInAPI([message],commands.ADDLABEL,label)
                    }
                    return message
                },this)
        this.setState({messages: newMessages});
    }

    deleteSelected() {
        const messages = this.state.messages
        console.log('in deleteSelected with messages',messages)
        const newMessages = messages.filter(function( message ) {
            console.log('in deleteSelected with message',message)
            if (!!message.selected) {
                console.log('calling deleteById')
//                this.deleteById(message.id)
                this.makeChangeInAPI([message],commands.DELETE)
                return false
            }
//            return !message.selected;
            return true

        }, this)
        this.setState({messages: newMessages});
    }

    selectStar(message) {
        message.starred = !message.starred
        this.updateMessages(message,commands.STAR)
    }

    selectCheck(message) {
        message.selected = !message.selected
        message.checked = !!message.selected ? 'on' : 'off'
        this.updateMessages(message,!!message.selected ? commands.SELECT : commands.UNSELECT)
    }

    markUnread() {
       let newMessages = this.state.messages.filter(function(message) {
                    if (!!message.selected) {
                        message.read = false
                        this.makeChangeInAPI([message],commands.UNREAD)
                    }
                    return message
                },this)
        this.setState({messages: newMessages});
    }

    markRead() {
        let newMessages = this.state.messages.filter(function(message) {
             if (!!message.selected) {
                 message.read = true
                 this.makeChangeInAPI([message],commands.READ)
             }
             return message
        },this)
        this.setState({messages: newMessages});
    }

    render() {
        const messages = this.state.messages
        return (
            <Messages commands={this.state.commands} messages={messages} markRead={this.markRead} markUnread={this.markUnread} removeLabels={this.removeLabels} applyLabels={this.applyLabels} selectAll={this.selectAll} deleteSelected={this.deleteSelected} countNumSelected={this.countNumSelected} selectStar={this.selectStar} selectCheck={this.selectCheck} updateMessages={this.updateMessages} changeMessages={this.changeMessages}/>
        );
    }
}

export default App;

