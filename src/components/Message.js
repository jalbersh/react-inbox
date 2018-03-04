import React from 'react'
import '../index.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={message: props.message}
        this.selectOnCheck = this.selectOnCheck.bind(this)
        this.selectStar = this.selectStar.bind(this)
    }

    selectOnCheck(e) {
        e.preventDefault()
        const checked = e.target.value
        console.log('Message.selectOnCheck with checked',checked)
        let message = this.state.message
        if (checked === 'on') {
            message.selected = true
            message.checked = 'on'
        } else {
            message.selected = false
            message.checked = 'off'
        }
        this.setState({message: message})
        this.props.updateMessages(message)
    }

    selectStar(e) {
        e.preventDefault()
        const target = e.target
        console.log('target',target)
        const index = target.message
        console.log('index',index)
        const checked = true
        console.log('Message.selectStar with checked',checked)
        let message = this.state.message
        if (checked === 'on') {
            message.star = true
        } else {
            message.star = false
        }
        this.setState({message: message})
        this.props.updateMessages(message)
    }

    render() {
        const message = this.state.message
        const text = message.text
        const checked = message.checked
        const star = message.star === true ? 'star fa fa-star' : 'star fa fa-star-o'
        const unread = message.unread === true ? 'message.unread' : 'message.read'
        const labels = message.labels ? message.labels : []
        const selected = message.selected === true ? 'message.select' : 'message'
        const className = 'row'+{selected}+{unread}
        if (checked==='on') {
            return (
                <div className={className}>
                      <div className="col-xs-2">
                            <input type="checkbox" checked={checked} onChange={this.selectOnCheck}/>
                      </div>
                      <div className="col-xs-2">
                        <i className={star} onClick={this.selectStar}></i>
                      </div>
                      <div className="collection">
                        {
                            labels.map( (label, index) => <span key={index} className="label label-warning">{label}</span> )
                        }
                      </div>
                      <div className="message-body">{text}</div>
                </div>
            )
        } else {
            return (
                <div className={className}>
                      <div className="col-xs-2">
                            <input type="checkbox" onChange={this.selectOnCheck}/>
                      </div>
                      <div className="col-xs-2">
                        <i className={star} onClick={this.selectStar}></i>
                      </div>
                      <div className="collection">
                        {
                            labels.map( (label, index) => <span key={index} className="label label-warning">{label}</span> )
                        }
                      </div>
                      <div className="message-body">{text}</div>
                </div>
            )
        }
    }
}

export default Message;
