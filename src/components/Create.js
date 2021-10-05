import React,{useState} from 'react'
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'

function Create () {

  const[firstName,setFirstName]= useState('');
  const[lastName, setLastName]= useState('');
  const[checkBox,setCheckBox]= useState(false);

  const postData= ()=>{
      axios.post(`https://615b12174a360f0017a81474.mockapi.io/fakedata`,{
        firstName,
        lastName,
        checkBox
      })
  }
  return(
  <Form className="create-form">
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' onChange={(e)=>setCheckBox(!checkBox)} />
    </Form.Field>
    <Button  onClick={postData} type='submit'>Submit</Button>
  </Form>
  )
}
export default Create