import React from 'react'
import '../index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { applyLabels, deleteSelected, markRead, markUnread, selectAll, removeLabels, countNumSelected } from '../Actions/actions'
import {SELECT_ALL_STARTED} from '../Utils/actionTypes'
import store from '../store'

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={messages: this.props.messages}
        this.countUnread = this.countUnread.bind(this)
        this.markAsRead = this.markAsRead.bind(this)
        this.markAsUnread = this.markAsUnread.bind(this)
        this.deleteAllSelected = this.deleteAllSelected.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.applyLabels = this.applyLabels.bind(this)
        this.removeLabels = this.removeLabels.bind(this)
    }

    markAsRead(e) {
        e.stopPropagation()
        store.dispatch(markRead(this.props.messages))

    }

    markAsUnread(e) {
        e.stopPropagation()
        store.dispatch(markUnread(this.props.messages))
    }

    deleteAllSelected(e) {
        e.stopPropagation()
        store.dispatch(deleteSelected(this.props.messages))
    }

    selectAll(e) {
        e.stopPropagation()
        const className = e.target.firstElementChild.className || ''
        const star = className.indexOf('fa-square-o') > -1 ? true : false
        store.dispatch({type: SELECT_ALL_STARTED, select: star, messages: this.props.messages})
        store.dispatch(selectAll())
    }

    countUnread(messages) {
        var count = messages && messages.length>0 ? messages.reduce(function(count, message) {
            return !message.read ? count+1 : count
        }, 0) : 0
        return count
    }

    applyLabels(e) {
        e.preventDefault()
        const label = e.target.value
        store.dispatch(applyLabels(this.props.messages,label))
    }

    removeLabels(e) {
        e.preventDefault()
        const label = e.target.value
        store.dispatch(removeLabels(this.props.messages,label))
    }

    render() {
        const messages = this.props.messages
        const countSelected = countNumSelected(messages)
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
                <button className="btn btn-default" onClick={this.selectAll}><i className={`fa ${square}`}></i></button>
                <button className={`btn btn-default ${disabled}`} onClick={this.markAsRead}>Mark As Read</button>
                <button className={`btn btn-default ${disabled}`} onClick={this.markAsUnread}>Mark As Unread</button>
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
                <button className={`btn btn-default ${disabled}`} onClick={this.deleteAllSelected}><i className="fa fa-trash-o"></i></button>
              </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {messages: state.messages}
}

const mapDispatchToProps = dispatch => {
        bindActionCreators(
        {
           applyLabels,
           deleteSelected,
           markRead,
           markUnread,
           removeLabels,
           selectAll
        }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
