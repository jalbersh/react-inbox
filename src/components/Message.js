import React from 'react'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={message: props.message}
    }

    render() {
        const message = this.props.message
        const star = message.star
        const read = message.read
        const labels = message.labels
        const selected = message.selected
        const subject = message.subject
        const text = message.text
        return (
            <div className="collection-item">
              <div className="row">
                <div className="col s8">{selected}</div>
                <div className="col s8">{star}</div>
                <div className="collection">
                    {
                        labels.map( (label, index) => <div className="label">{label}</div> )
                    }
                </div>
                <div>{text}</div>
              </div>
            </div>
        )
    }
}

export default Message;
