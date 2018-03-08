import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages'

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
    }

    changeMessages(newMessages) {
        console.log('in changeMessages with',newMessages)
        this.setState({messages: newMessages})
    }

    updateMessages (message) {
       let curMessages = this.state.messages
//       console.log('in App.updateMessages with',curMessages)
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
                    }
                    return message
                })
        this.setState({messages: newMessages});
    }

    applyLabels(e) {
        e.preventDefault()
        const label = e.target.value
        let newMessages = this.state.messages.map(function(message) {
                    if (message.selected === true) {
                        message.labels.push(label)
                    }
                    return message
                })
        this.setState({messages: newMessages});
    }

    deleteSelected() {
        const messages = this.props.messages
        const newMessages = messages.filter(function( message ) {
                return !message.selected;
        })
        this.setState({messages: newMessages});
    }

    selectStar(message) {
        message.star = !message.star
        this.updateMessages(message)
    }

    selectCheck(message) {
        message.selected = !message.selected
        message.checked = !!message.selected ? 'on' : 'off'
        this.updateMessages(message)
    }

    markUnread() {
       let newMessages = this.state.messages.filter(function(message) {
                    if (!!message.selected) {
                        message.unread = true
                    }
                    return message
                })
        this.setState({messages: newMessages});
    }

    markRead() {
        let newMessages = this.state.messages.filter(function(message) {
             if (!!message.selected) {
                 message.unread = false
             }
             return message
        })
        this.setState({messages: newMessages});
    }

    render() {
        const messages = this.state.messages
        return (
            <Messages messages={messages} markRead={this.markRead} markUnread={this.markUnread} removeLabels={this.removeLabels} applyLabels={this.applyLabels} selectAll={this.selectAll} deleteSelected={this.deleteSelected} countNumSelected={this.countNumSelected} selectStar={this.selectStar} selectCheck={this.selectCheck} updateMessages={this.updateMessages} changeMessages={this.changeMessages}/>
        );
    }
}

export default App;

