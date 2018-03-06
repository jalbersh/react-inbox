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
    }

    handleChange = (event, index, value) => {
        console.log('in Messages.handleChange with ',value)
        this.setState({value});
    }

    render() {
        const messages = this.props.messages

        return (
            <div className="container">
                <Toolbar messages={messages} changeMessages={ this.props.changeMessages } updateMessages={ this.props.updateMessages } />
                    {
                        messages ? messages.map( (msg, index) => <Message key={ index } message={ msg } updateMessages={ this.props.updateMessages } selectStar={this.props.selectStar} selectCheck={this.props.selectCheck} /> ) : <div>no messages</div>
                    }
              <br />
              <br />
              <AddMessage messages={messages} onSubmit={ this.props.updateMessages } />
            </div>
        )
    }
}

export default Messages;
