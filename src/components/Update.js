import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'


function Update() {

  let history = useHistory();

  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setRating(localStorage.getItem('Rating'));
    setImage(localStorage.getItem('image'));
    setCheckBox(localStorage.getItem('Checkbox Value'))
  }, [])


  const updateAPIData = () => {
    axios.put(`https://615b12174a360f0017a81474.mockapi.io/fakedata/${id}`, {
      firstName,
      lastName,
      rating,
      checkBox
    })
      .then(() => {
        history.push('./read')
      })
  }
  return (
    <Form className="create-form">
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Rating</label>
        <input placeholder='rating' value={rating} onChange={(e) => setRating(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Image</label>
        <input placeholder='image' value={image} onChange={(e) => setImage(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' checked={checkBox} onChange={(e) => setCheckBox(!checkBox)} />
      </Form.Field>

      <Button type='submit' onClick={updateAPIData}>update</Button>

    </Form>
  )
}
export default Update