import React from 'react'
import '../index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkMessage, starMessage } from '../Actions/actions'
import store from '../store'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: props.messages, message: props.message}
        this.checkTheMessage = this.checkTheMessage.bind(this)
        this.starTheMessage = this.starTheMessage.bind(this)
    }

    checkTheMessage(e) {
        e.stopPropagation()
        const message = this.props.message
        const current = message.selected ? true : false
        const selected = !current
        store.dispatch(checkMessage(this.props.messages,this.props.message,selected))
    }

    starTheMessage (e) {
        e.stopPropagation()
        const className = e.target.className
        const star = className.indexOf('fa-star-o') > -1 ? true : false
        store.dispatch(starMessage(this.props.messages,this.props.message,star))
    }

    render() {
        const message = this.props.message
        const subject = message.subject
        const star = !!message.starred ? 'fa-star' : 'fa-star-o'
        const unread = !message.read ? 'unread' : 'read'
        const labels = message.labels ? message.labels : []
        const selected = !!message.selected ? 'message selected' : 'message'
            return (
                <div className={`row ${unread} ${selected}`}>
                      <div className="col-xs-1">
                          <div className="col-xs-2">
                              <input type="checkbox" checked={ !!message.selected } onChange={this.checkTheMessage}/>
                          </div>
                          <div className="col-xs-2" onClick={this.starTheMessage}>
                              <i className={`star fa ${star}`} ></i>
                          </div>
                      </div>
                      <div className="col-xs-11">
                        {
                            labels.map( (label, index) => <span key={index} className="label label-warning">{label}</span> )
                        }
                        <span>{subject}</span>
                      </div>
                </div>
            )
    }
}

export function mapStateToProps(state) {
    return {messages: state.messages}
}

export const mapDispatchToProps = dispatch => {
        bindActionCreators(
        {
           starMessage,
           checkMessage
        }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
