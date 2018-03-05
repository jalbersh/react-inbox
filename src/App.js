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
    }

    updateMessages (message) {
       let curMessages = this.state.messages
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
       console.log('updateMessages calling setState with newMessages=',newMessages)
       this.setState({messages: newMessages})
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

  render() {
    const messages = this.state.messages
    return (
        <Messages messages={messages} selectStar={this.selectStar} selectCheck={this.selectCheck} updateMessages={this.updateMessages}/>
    );
  }
}

export default App;

