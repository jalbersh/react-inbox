import React from 'react'
import {Row, Input, Button} from 'react-materialize'

class AddMessage extends React.Component {

  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(e) {
        e.preventDefault()
        const index = e.target.value
        if (index > 0) {
            const msgList = this.props.messages
            const message=messages[index]
            const result = {'message':message}
            this.props.onSubmit(result)
        } else {
            console.log('can\'t select default')
        }
   }

  render() {
      const msgList = this.props.messages
      return (
         <div>
             <form onSubmit={this.submitHandler}>
                 <Row>
	                 <Input s={12} type='select' defaultValue='0' name="message">
	                      <option key='0' value='0'>Select a message</option>
	                      {messages.map( (message, index) => <option key={index} value={index}>{message}</option> )}
                     </Input>
                     <Input type="subject" label="subject" name="subject" />
                     <Input type="text" label="quantity" name="quantity" />
                     <Button type="submit" label="submit" value="submit">Submit</Button>
                 </Row>
             </form>
         </div>
      )
  }

}

export default AddMessage;
