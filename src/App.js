import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMessagesInAPI } from './Actions/actions'
import './App.css';
import Messages from './components/Messages'
import store from './store'

class App extends Component {
    constructor(props) {
        super(props)
        this.state={messages: this.props.messages}
    }

    async componentDidMount() {
        store.dispatch(fetchMessagesInAPI())
    }

    render() {
        return (
            <Messages commands={this.state.commands} />
        );
    }
}

function mapStateToProps(state) {
    return {messages: state.messages}
}

const mapDispatchToProps = dispatch => {
        bindActionCreators(
        {
            fetchMessagesInAPI
        }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

