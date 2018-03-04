import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const messages = [
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj1', text: 'When a user views the app' },
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj2', text: 'Then they should see a list of messages with their subjects' },
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj3', text: 'If the message is read, it should have the read style' },
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj4', text: 'If the message is unread, it should have the unread' },
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj5', text: 'If the message is selected, it should have the selected style and the box should be checked' },
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj6', text: 'If there are labels on a message, they should appear' },
  { labels: [], checked: 'off', selected: false, unread: true, star: false, subject: 'subj7', text: 'If the message is starred, then the star should be filled in, otherwise it should be empty' }
]

ReactDOM.render(<App messages={messages} />, document.getElementById('root'));
registerServiceWorker();
