import React from 'react'
import '../index.css'
import Message from '../components/Message';
import AddMessage from '../components/AddMessage';
import Toolbar from '../components/Toolbar'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
        this.updateMessages = this.updateMessages.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeMessages = this.changeMessages.bind(this)
    }

    updateMessages (message) {
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
       console.log('updateMessages calling setState with newMessages=',newMessages)
       this.setState({messages: newMessages})
    }

    changeMessages(newMessages) {
        console.log('in changeMessages with',newMessages)
        this.setState({messages: newMessages})
    }

    handleChange = (event, index, value) => {
        console.log('in Messages.handleChange with ',value)
        this.setState({value});
    }

    render() {
        const messages = this.state.messages

        return (
            <div>
              <div className="container">
                <div className="collection-item row grey lighten-3">
                  <div className="col s8">Message</div>
                </div>
                <Toolbar messages={messages} changeMessages={ this.changeMessages } updateMessages={ this.updateMessages } />
                <div className="collection">
                    {
                        messages ? messages.map( (msg, index) => <Message key={ index } message={ msg } updateMessages={ this.updateMessages } /> ) : <div>no messages</div>
                    }
                </div>
              </div>
              <br />
              <br />
              <AddMessage onSubmit={ this.updateMessages } messages={messages}
              />
            </div>
        )
    }
}

export default Messages;
