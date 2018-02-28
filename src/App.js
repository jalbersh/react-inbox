import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={messages: this.props.messages}
  }

  render() {
    const messages = this.props.messages
    return (
      <div className="App">
        <Messages messages={messages} />
      </div>
    );
  }
}

export default App;

//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <h1 className="App-title">Welcome to React</h1>
//        </header>
