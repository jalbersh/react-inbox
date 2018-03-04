import React from 'react'
import '../index.css'

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={message: props.message}
        this.selectOnCheck = this.selectOnCheck.bind(this)
        this.selectStar = this.selectStar.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    selectOnCheck(e) {
        e.preventDefault()
        const checked = e.target.value
        console.log('Message.selectOnCheck with checked',checked)
        let message = this.state.message
        if (checked === 'on') {
            message.selected = true
            message.checked = 'checked'
        } else {
            message.selected = false
            message.checked = 'unchecked'
        }
        this.setState({message: message})
        this.props.updateMessages(message)
    }

    selectStar(e) {
        e.preventDefault()
        const checked = e.target.value
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

    handleChange = (event, index, value) => {
        console.log('in Message.handleChange with ',value)
        this.setState({value});
    }

    render() {
        const message = this.props.message
        const text = message.text
        const star = message.star === true ? 'star fa fa-star' : 'star fa fa-star-o'
        const unread = message.unread === true ? 'unread' : 'read'
        const labels = message.labels ? message.labels : []
        const selected = message.selected
        if (selected===true) {
            return (
                <div className="row message.select {unread}">
                      <div className="col-xs-2">
                            <input type="checkbox" checked onChange={this.selectOnCheck}/>
                      </div>
                      <div className="col-xs-2">
                        <i className={star} onChange={this.selectStar}></i>
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
                <div className="row message {unread}">
                      <div className="col-xs-2">
                            <input type="checkbox" unchecked onChange={this.selectOnCheck}/>
                      </div>
                      <div className="col-xs-2">
                        <i className={star}></i>
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
