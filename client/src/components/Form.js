import React, {useState} from 'react'
import {withFirebase} from './Firebase/index'
import moment from 'moment'
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

const FormBase = (props) => {

    const [message, setMessage] = useState('')
   
    const sendMessage = () => {
        let messageObject = {
          sender: props.sender,
          receiver: props.receiver,
          timestamp: moment().format('LLLL'),
          message: message
        }
  
        props.firebase.send(messageObject)
      }

    return (
        <>
        <InputGroup>
        <Input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <InputGroupAddon addonType="append">
          
            <button disabled={message === ''} className="btn btn-success" onClick={() => sendMessage()}>Send</button>
          
        </InputGroupAddon>
      </InputGroup>
      </>
    )
}

const Form = withFirebase(FormBase)

export default Form



