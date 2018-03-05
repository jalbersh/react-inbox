import React from 'react'
import '../index.css'
import Message from '../components/Message';
import AddMessage from '../components/AddMessage';
import Toolbar from '../components/Toolbar'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
        this.handleChange = this.handleChange.bind(this)
        this.changeMessages = this.changeMessages.bind(this)
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
            <div className="container">
                <Toolbar messages={messages} changeMessages={ this.changeMessages } updateMessages={ this.updateMessages } />
                    {
                        messages ? messages.map( (msg, index) => <Message key={ index } message={ msg } updateMessages={ this.props.updateMessages } selectStar={this.props.selectStar} selectCheck={this.props.selectCheck} /> ) : <div>no messages</div>
                    }
              <br />
              <br />
              <AddMessage onSubmit={ this.props.updateMessages } messages={messages}
              />
            </div>
        )
    }
}

export default Messages;
