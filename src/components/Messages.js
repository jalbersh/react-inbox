import React from 'react'
import Message from '../components/Message';
import AddMessage from '../components/AddMessage';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
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

       this.setState({messages: newMessages})
    }

    render() {
        const messages = this.state.messages

        return (
            <div>
              <div className="container">
                <div className="collection-item row grey lighten-3">
                  <div className="col s8">Message</div>
                </div>
                <div className="collection">
                    {
                        messages.map( (msg, index) => <Message key={ index } message={ msg } /> )
                    }
                </div>
              </div>
              <AddMessage onSubmit={ this.updateMessages } />
            </div>
        )
    }
}

export default Messages;
