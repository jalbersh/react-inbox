import React from 'react'
import {Row, Input, Button} from 'react-materialize'
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
         <div>
            <div>Add Message</div>
             <form onSubmit={this.submitHandler}>
                 <Row>
                         <Input type="subject" label="subject" name="subject" ></Input>
                         <Input type="text" label="text" name="text" ></Input>
                         <Button type="submit" label="submit" value="submit">Submit</Button>
                 </Row>
             </form>
         </div>
      )
  }

}

export default AddMessage;

//	                 <Input s={12} type='select' defaultValue='0' name="message">
//	                      <option key='0' value='0'>Select a message</option>
//                   </Input>
