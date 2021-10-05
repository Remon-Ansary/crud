import React,{useEffect , useState} from 'react'
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'

function Update () {

    const [id,setId] = useState(null);
  const[firstName,setFirstName]= useState('');
  const[lastName, setLastName]= useState('');
  const[checkBox,setCheckBox]= useState(false);

useEffect(()=>{
    setId(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setCheckBox(localStorage.getItem('Checkbox Value'))
})

const updateAPIData =()=>{
    axios.put(`https://615b12174a360f0017a81474.mockapi.io/fakedata/${id}`,{
        firstName,
        lastName,
        checkBox
    })
}
  return(
  <Form className="create-form">
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' value={firstName}  onChange={(e) => setFirstName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' value ={lastName} onChange={(e) => setLastName(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions'  checked={checkBox}   onChange={(e) => setCheckBox(!checkBox)}  />
    </Form.Field>
    <Button  type='submit' onClick={updateAPIData}>update</Button>
  </Form>
  )
}
export default Update