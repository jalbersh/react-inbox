import React from 'react'
import '../index.css'

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
        this.deleteSelected = this.deleteSelected.bind(this)
        this.applyLabels = this.applyLabels.bind(this)
        this.removeLabels = this.removeLabels.bind(this)
        this.markUnread = this.markUnread.bind(this)
        this.markRead = this.markRead.bind(this)
        this.countUnread = this.countUnread.bind(this)
        this.selectAll = this.selectAll.bind(this)
    }

    removeLabels(e) {
        e.preventDefault()
        const label = e.target.value
        let messages = this.state.messages.map(function(message) {
                    if (message.selected === true) {
                        let labels = message.labels
                        if (labels && labels.length>0) {
                            let newLabels = []
                            let lblIndex = labels.indexOf(label)
                            if (lblIndex !== -1) {
                               newLabels = [
                                    ...labels.slice(0, lblIndex),
                                    ...labels.slice(lblIndex + 1)
                               ]
                               message.labels = newLabels
                            }
                        }
                    }
                    return message
                })
        this.setState({messages: messages});
        this.props.changeMessages(messages)
    }

    applyLabels(e) {
        e.preventDefault()
        let messages = this.state.messages
        const label = e.target.value
        messages = this.state.messages.map(function(message) {
                    if (message.selected === true) {
                        message.labels.push(label)
                    }
                    return message
                })
        this.setState({messages: messages});
        this.props.changeMessages(messages)
    }

    selectAll(e) {
        e.preventDefault()
        let messages = this.state.messages
        messages = this.state.messages.map(function(message) {
                    message.selected = !message.selected
                    message.checked = !!message.selected ? 'on' : 'off'
                    return message
                })
        this.setState({messages: messages});
        this.props.changeMessages(messages)
    }

    deleteSelected(e) {
        e.preventDefault()
        let messages = this.state.messages
        messages = this.state.messages.filter(function(message) {
                    return !message.selected
                })
        this.setState({messages: messages});
        this.props.changeMessages(messages)
    }

    markUnread(e) {
        e.preventDefault()
        let messages = this.state.messages
        messages = this.state.messages.filter(function(message) {
                    if (!!message.selected) {
                        message.unread = true
                    }
                    return message
                })
        this.setState({messages: messages});
        this.props.changeMessages(messages)
    }

    markRead(e) {
        e.preventDefault()
        let messages = this.state.messages
        messages = this.state.messages.filter(function(message) {
             if (!!message.selected) {
                 message.unread = false
             }
             return message
        })
        this.setState({messages: messages});
        this.props.changeMessages(messages)
    }

    countUnread() {
        let messages = this.state.messages
        console.log('countUnread',messages)
        var count = messages.reduce(function(count, message) {
            return !!message.unread ? count+1 : count
        }, 0);
        console.log('count returning',count)
        return count
    }

    render() {
        const count = this.countUnread()
        const msgCount = this.state.messages ? this.state.messages.length : 0
        const disabled = count && count === msgCount ? 'disabled' : ''
        console.log('in Toolbar.render comparing',count,msgCount)
        return (
            <div className="row toolbar">
              <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">{count}</span>
                  unread messages
                </p>
                <button className="btn btn-default" onClick={this.selectAll}><i className="fa fa-check-square-o"></i></button>
                <button className={`btn btn-default ${disabled}`} onClick={this.markRead}>Mark As Read</button>
                <button className={`btn btn-default ${disabled}`} onClick={this.markUnread}>Mark As Unread</button>
                <select className="form-control label-select" onChange={this.applyLabels} >
                  <option>Apply label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>
                <select className="form-control label-select" onChange={this.removeLabels} >
                  <option>Remove label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>
                <button className={`btn btn-default ${disabled}`} onClick={this.deleteSelected}><i className="fa fa-trash-o"></i></button>
              </div>
            </div>
        );
    }
}

export default Toolbar;