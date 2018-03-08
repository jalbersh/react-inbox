import React from 'react'
import '../index.css'
import Message from '../components/Message';
import AddMessage from '../components/AddMessage';
import Toolbar from '../components/Toolbar'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
    }

    render() {
        const messages = this.props.messages
        return (
            <div className="container">
                <Toolbar messages={messages} markRead={this.props.markRead} markUnread={this.props.markUnread} countNumSelected={this.props.countNumSelected} applyLabels={this.props.applyLabels} removeLabels={this.props.removeLabels} selectAll={this.props.selectAll} deleteSelected={this.props.deleteSelected} changeMessages={ this.props.changeMessages } updateMessages={ this.props.updateMessages } />
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
