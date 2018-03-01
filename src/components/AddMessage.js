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
        const index = e.target.value
        if (index > 0) {
            const msgList = this.props.messages
            const message=msgList[index]
            const result = {'message':message}
            this.props.onSubmit(result)
        } else {
            console.log('can\'t select default')
        }
   }

  render() {
      return (
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Add Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label for="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
            </div>
          </div>
          <div className="form-group">
            <label for="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control"></textarea>
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
