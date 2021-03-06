import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import App from '../App';

describe("for the App", () => {

    beforeEach(() => {
    })

    function renderApp(customProperties = {}) {
        const dispatchSpy = jasmine.createSpy('dispatchSpy').and.callFake(arg => arg)

        const messages = [
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj1', subject: 'When a user views the app' },
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj2', subject: 'Then they should see a list of messages with their subjects' },
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj3', subject: 'If the message is read, it should have the read style' },
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj4', subject: 'If the message is unread, it should have the unread' },
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj5', subject: 'If the message is selected, it should have the selected style and the box should be checked' },
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj6', subject: 'If there are labels on a message, they should appear' },
          { labels: [], checked: 'off', selected: false, unread: true, starred: false, text: 'subj7', subject: 'If the message is starred, then the star should be filled in, otherwise it should be empty' }
        ]

        const properties = {
            messages: messages
        }

        const {output} = shallow(
            <App {...properties}/>
        ).dive()

        return {
            output,
            dispatchSpy
        }
    }
//
//  describe('Check functionality', function() {
//    it('does something', function() {
//       expect(new App().toEqual(0));
//    });
//  });

  it("confirms button", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('button').text()).toEqual('Mark As Read');
  });

   describe('#componentDidMount', () => {
        it('dispatches action creators on page load', () => {
            const {dispatchSpy} = renderApp()

            expect(dispatchSpy).toHaveBeenCalled()
        })
    })
})
