import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker'

    const messages = [
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj1', subject: 'When a user views the app' },
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj2', subject: 'Then they should see a list of messages with their subjects' },
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj3', subject: 'If the message is read, it should have the read style' },
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj4', subject: 'If the message is unread, it should have the unread' },
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj5', subject: 'If the message is selected, it should have the selected style and the box should be checked' },
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj6', subject: 'If there are labels on a message, they should appear' },
    //  { labels: [], checked: 'off', selected: false, read: true, starred: false, text: 'subj7', subject: 'If the message is starred, then the star should be filled in, otherwise it should be empty' }
    ]

ReactDOM.render(
    <Provider store={ store }>
        <App messages={messages} />
      </Provider>,
      document.getElementById('root')
)
registerServiceWorker()
;