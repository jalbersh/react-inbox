import React from 'react'
import '../index.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={message: props.message}
        this.checkMessage = this.checkMessage.bind(this)
        this.starMessage = this.starMessage.bind(this)
    }

    checkMessage(e) {
        e.stopPropagation()
        this.props.selectCheck(this.props.message)
    }

    starMessage (e) {
        e.stopPropagation()
        this.props.selectStar(this.props.message)
    }

    render() {
        const message = this.props.message
//        console.log('in Message.render',message)
        const subject = message.subject
        const star = !!message.starred ? 'fa-star' : 'fa-star-o'
        const unread = !message.read ? 'unread' : 'read'
        const labels = message.labels ? message.labels : []
        const selected = !!message.selected ? 'message selected' : 'message'
            return (
                <div className={`row ${unread} ${selected}`}>
                      <div className="col-xs-1">
                          <div className="col-xs-2">
                              <input type="checkbox" checked={ !!message.selected } onChange={this.checkMessage}/>
                          </div>
                          <div className="col-xs-2" onClick={this.starMessage}>
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

export default Message;
