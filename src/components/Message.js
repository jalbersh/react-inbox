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
        console.log('selectOnCheck')
        const checked = e.target.value
        let message = this.state.message
        if (checked === 'on') {
            console.log('checked')
            message.selected = true
            this.setState({message: message})
        } else {
            console.log('unchecked')
            message.selected = false
            this.setState({message: message})
        }
    }

    render() {
        const message = this.props.message
        console.log('in render with message',message)
        const text = message.text
//        const star = message.star
//        const unread = message.unread
        const labels = message.labels ? message.labels : []
        const selected = message.selected
        console.log('selected',selected)
//        const checked = selected === true ? 'checked' : 'unchecked'
        const selectClass = selected === true ? 'message.select' : 'message'
        console.log('selectClass=',selectClass)
//        const subject = message.subject
        if (selected === true) {
            return (
                <div className="row {selectClass} {unread}">
                      <div className="col-xs-2">
                            <input type="checkbox" checked onChange={this.selectOnCheck}/>
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
        } else {
            return (
                <div className="row {selectClass} {unread}">
                      <div className="col-xs-2">
                            <input type="checkbox" unchecked onChange={this.selectOnCheck}/>
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
}

export default Message;

//                <div className=".message.selected">{selected}</div>
