import React from 'react'
import '../index.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={message: props.message}
    }

    render() {
        const message = this.props.message
        const text = message.text
//        const star = message.star
//        const unread = message.unread
//        const labels = message.labels
//        const selected = message.selected
//        const subject = message.subject
        return (
            <div className="message">
              <div className="row">
                <div className="message.body">{text}</div>
              </div>
            </div>
        )
    }
}

export default Message;

//                <div className=".message.selected">{selected}</div>
//                <div className="col s8">{star}</div>
//                <div className="collection">
//                    {
//                        labels.map( (label, index) => <div className=".label">{label}</div> )
//                    }
//                </div>
