import React from 'react'
import '../index.css'

class AddMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state={messages: this.props.messages}
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(e) {
        e.preventDefault()
        const target = e.target
        console.log('submitHandler with',target.body.value,' and',target.subject.value)
        const body = target.body.value
        const subject = target.subject.value
        const message = { 'labels': [],
                          'checked': 'off',
                          'selected': false,
                          'unread': true,
                          'star': false,
                          'subject': subject,
                          'text': body }
        console.log('submitHandler message=',message)
        this.props.onSubmit(message)
   }

  render() {
      return (
        <form className="form-horizontal well" onSubmit={this.submitHandler}>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Add Message</h4>
            </div>
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

export default AddMessage;


//	                 <Input s={12} type='select' defaultValue='0' name="message">
//	                      <option key='0' value='0'>Select a message</option>
//                   </Input>
