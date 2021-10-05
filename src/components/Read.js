import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function Read() {
    const [APIData, setAPIData] = useState([]);
    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }

    //    delete part 
    const getData = (data) => {
        axios.get(`https://615b12174a360f0017a81474.mockapi.io/fakedata`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }


    const onDelete = (id) => {
        axios.delete(`https://615b12174a360f0017a81474.mockapi.io/fakedata/${id}`)
            .then(() => {
                getData();
            })
    }
    //delete part end



    useEffect(() => {
        axios.get(`https://615b12174a360f0017a81474.mockapi.io/fakedata`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Checkbox</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {APIData.map((data) => {
                    return (
                        <Table.Row>
                            <Table.Cell>{data.firstName}</Table.Cell>
                            <Table.Cell>{data.lastName}</Table.Cell>
                            <Table.Cell>{data.checkBox ? 'checked' : 'unChecked'}</Table.Cell>
                            <Link to='/update'>

                                <Table.Cell>
                                    <Button onClick={() => setData(data)}>Update</Button>
                                </Table.Cell>
                            </Link>
                            
                            <Table.Cell>
                                <Button onClick={() => onDelete(data.id)}>Delete</Button>
                            </Table.Cell>

                        </Table.Row>
                    )
                })
                }
            </Table.Body>
        </Table>
    )


}

export default Read
