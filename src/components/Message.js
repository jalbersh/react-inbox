import React from 'react'
import '../index.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={message: props.message}
        this.selectOnCheck = this.selectOnCheck.bind(this)
    }

    selectOnCheck(e) {
        e.preventDefault()
        const checked = e.target.value
        let message = this.state.message
        if (checked === 'on') {
            console.log('checked')
            message.selected = true
            this.setState({message: message})
        } else {
            message.selected = false
            this.setState({message: message})
        }
    }

    render() {
        const message = this.props.message
        const text = message.text
//        const star = message.star
//        const unread = message.unread
        const labels = message.labels
        const selected = message.selected
        console.log('selected',selected)
        const checked = 'off'//selected === true ? 'on' : 'off'
//        const subject = message.subject
        return (
            <div className="row message unread">
                  <div className="col-xs-2">
                    <input type="checkbox" checked='unchecked' onChange={this.selectOnCheck}/>
                  </div>
                  <div className="col-xs-2">
                    <i className="star fa fa-star-o"></i>
                  </div>
                  <div className="collection">
                    {
                        labels.map( (label, index) => <div className="label">{label}</div> )
                    }
                  </div>
                  <div className="message-body">{text}</div>
            </div>
        )
    }
}

export default Message;

//                <div className=".message.selected">{selected}</div>
