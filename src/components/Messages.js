import React from 'react'
import '../index.css'
import Message from '../components/Message';
import AddMessage from '../components/AddMessage';
import Toolbar from '../components/Toolbar'
import { connect } from 'react-redux'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
    }

    render() {
        const messages = this.props.messages
        return (
            <div className="container">
                <Toolbar />
                    {
                        messages && messages.length>0 ? messages.map( (msg, index) => <Message key={ index } message={ msg } /> ) : <div>no messages</div>
                    }
              <br />
              <br />
              <AddMessage commands={this.state.commands} messages={messages} />
            </div>
        )
    }
}

export function mapStateToProps(state) {
    return {messages: state.messages}
}

export default connect(
  mapStateToProps,
  null
)(Messages);
