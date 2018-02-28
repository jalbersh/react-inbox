import React from 'react'
import '../index.css'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Message from '../components/Message';
import AddMessage from '../components/AddMessage';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
        this.updateMessages = this.updateMessages.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    handleChange = (event, index, value) => this.setState({value});

    render() {
        const messages = this.state.messages

        return (
            <div>
              <div className="container">
                <div className="collection-item row grey lighten-3">
                  <div className="col s8">Message</div>
                </div>
              <Toolbar className="toolbar">
              </Toolbar>
                <div className="collection">
                    {
                        messages ? messages.map( (msg, index) => <Message key={ index } message={ msg } /> ) : <div>no messages</div>
                    }
                </div>
              </div>
              <AddMessage onSubmit={ this.updateMessages } messages={messages}
              />
            </div>
        )
    }
}

export default Messages;
