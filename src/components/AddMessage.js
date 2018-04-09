import React from 'react'
import '../index.css'
import { addMessageInAPI } from '../Actions/actions'
import store from '../store'
import {API_ADD_REQUEST_STARTED} from '../Utils/actionTypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AddMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state={messages: this.props.messages, message: this.props.message}
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(e) {
        e.preventDefault()
        const target = e.target
        const body = target.body.value
        const subject = target.subject.value
        e.target.reset()
        store.dispatch({type:API_ADD_REQUEST_STARTED, partial: {'subject': subject,'body': body}})
        store.dispatch(addMessageInAPI())
   }

  render() {
      return (
        <form className="form-horizontal well" onSubmit={this.submitHandler}>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2"><h4>Add Message</h4></div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input label="subject" type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea label="body" name="body" id="body" className="form-control" placeholder="Enter the body of the email"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary" />
            </div>
          </div>
        </form>
      )
  }

}

function mapStateToProps(state) {
    return {messages: state.messages, message: state.message}
}

const mapDispatchToProps = dispatch => {
        bindActionCreators(
        {
           addMessageInAPI
        }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessage);

//export default AddMessage;

