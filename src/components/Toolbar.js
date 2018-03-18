import React from 'react'
import '../index.css'

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
        this.countUnread = this.countUnread.bind(this)
        this.markAsUnread = this.markAsUnread.bind(this)
        this.markAsRead = this.markAsRead.bind(this)
    }

    deleteChecked(e) {
        e.stopPropagation()
        this.props.deleteSelected()
    }

    markAsRead(e) {
        e.stopPropagation()
        this.props.markRead()
    }

    markAsUnread(e) {
        e.stopPropagation()
        this.props.markUnread()
    }

    countUnread(messages) {
        var count = messages && messages.length>0 ? messages.reduce(function(count, message) {
            return !message.read ? count+1 : count
        }, 0) : 0
        return count
    }

    render() {
        const messages = this.props.messages
        const countSelected = this.props.countNumSelected(messages)
        const countUnread = this.countUnread(messages)
        const countMessages = messages ? messages.length : 0
        const square = countSelected === countMessages && countSelected > 0 ? 'fa-check-square-o' : 'fa-square-o'
        const disabled = countSelected>0 ? '' : 'disabled'
        return (
            <div className="row toolbar">
              <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">{countUnread}</span>
                  unread messages
                </p>
                <button className="btn btn-default" onClick={this.props.selectAll}><i className={`fa ${square}`}></i></button>
                <button className={`btn btn-default ${disabled}`} onClick={this.markAsRead}>Mark As Read</button>
                <button className={`btn btn-default ${disabled}`} onClick={this.markAsUnread}>Mark As Unread</button>
                <select className="form-control label-select" onChange={this.props.applyLabels} >
                  <option>Apply label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>
                <select className="form-control label-select" onChange={this.props.removeLabels} >
                  <option>Remove label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>
                <button className={`btn btn-default ${disabled}`} onClick={this.props.deleteSelected}><i className="fa fa-trash-o"></i></button>
              </div>
            </div>
        );
    }
}

export default Toolbar;