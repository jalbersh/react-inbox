import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMessageInAPI,fetchMessagesInAPI,updateMessagesInAPI } from './Actions'
import './App.css';
import Messages from './components/Messages'
import commands from './commands'
import store from './store'

class App extends Component {
    constructor(props) {
        super(props)
        this.state={messages: this.props.messages}
        this.selectStar = this.selectStar.bind(this)
        this.selectCheck = this.selectCheck.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
        this.deleteSelected = this.deleteSelected.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.countNumSelected = this.countNumSelected.bind(this)
        this.markRead = this.markRead.bind(this)
        this.markUnread = this.markUnread.bind(this)
        this.removeLabels = this.removeLabels.bind(this)
        this.applyLabels = this.applyLabels.bind(this)
        this.convertAPItoDisplay = this.convertAPItoDisplay.bind(this)
        this.convertDisplaytoAPI = this.convertDisplaytoAPI.bind(this)
    }

    async componentDidMount() {
        store.dispatch(fetchMessagesInAPI())
//        const messages = this.props.messages
//        this.setState({messages: messages})
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

    updateMessages (message, command) {
       let curMessages = this.props.messages
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
            store.dispatch(addMessageInAPI(message))
       } else if (command !== commands.SELECT &&
                  command !== commands.UNSELECT &&
                  command !== commands.CHECK &&
                  command !== commands.UNCHECK)
       {
            store.dispatch(updateMessagesInAPI([message],command,message.starred))
       }
       // need to do setState since selected is not part of the API, but for display purposes
       this.setState({messages: newMessages})
    }

    countNumSelected(messages) {
        var count = messages && messages.length>0 ? messages.reduce(function(count, message) {
            return !!message.selected ? count+1 : count
        }, 0) : 0
        return count
    }

    selectAll(e) {
        e.preventDefault()
        let messages = this.props.messages
        const countSelected = messages ? this.countNumSelected(messages) : 0
                messages = this.props.messages.map(function(message) {
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
        this.props.messages.map(function(message) {
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
                        store.dispatch(updateMessagesInAPI([message],commands.REMOVELABEL,label))
                    }
                    return message
                },this)
    }

    applyLabels(e) {
        e.preventDefault()
        const label = e.target.value
        this.props.messages.map(function(message) {
                    if (message.selected === true) {
                        message.labels.push(label)
                        store.dispatch(updateMessagesInAPI([message],commands.ADDLABEL,label))
                    }
                    return message
                },this)
    }

    deleteSelected() {
        const messages = this.props.messages
        console.log('in deleteSelected with messages',messages)
        messages.filter(function( message ) {
            console.log('in deleteSelected with message',message)
            if (!!message.selected) {
                console.log('calling deleteById')
                store.dispatch(updateMessagesInAPI([message],commands.DELETE))
                return false
            }
            return true

        }, this)
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
       this.props.messages.filter(function(message) {
                    if (!!message.selected) {
                        message.read = false
                        store.dispatch(updateMessagesInAPI([message],commands.UNREAD))
                    }
                    return message
                },this)
    }

    markRead() {
        this.props.messages.filter(function(message) {
             if (!!message.selected) {
                 message.read = true
                 store.dispatch(updateMessagesInAPI([message],commands.READ))
             }
             return message
        },this)
    }

    render() {
        const messages = this.props.messages
        return (
            <Messages commands={this.state.commands} messages={messages} markRead={this.markRead} markUnread={this.markUnread} removeLabels={this.removeLabels} applyLabels={this.applyLabels} selectAll={this.selectAll} deleteSelected={this.deleteSelected} countNumSelected={this.countNumSelected} selectStar={this.selectStar} selectCheck={this.selectCheck} updateMessages={this.updateMessages} />
        );
    }
}

    export function mapStateToProps(state) {
        console.log('in mapStateToProps',state.messages)
        return {messages: state.messages}
    }

    const mapDispatchToProps = dispatch => {
        console.log('in mapDispatchToProps')
            bindActionCreators(
            {
                addMessageInAPI,fetchMessagesInAPI,updateMessagesInAPI
            }, dispatch)
    }

//    const mapDispatchToProps = dispatch => {
//        addMessageInAPI: dispatch({message}),
//        fetchMessagesInAPI: dispatch(),
//        updateMessagesInAPI: dispatch({messages, command, value})
//    }


//    const mapDispatchToProps = dispatch => {
//        addMessageInAPI: dispatch(addMessageInAPI({message})),
//        fetchMessagesInAPI: dispatch(fetchMesssagesInApi()),
//        updateMessagesInAPI: dispatch(updateMessagesInAPI({messages, command, value}))
//    }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

//export default App;

