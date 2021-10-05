import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
function Read() {
    
    const setData =(data) =>{
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }

    const [APIData, setAPIData] = useState([]);

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
                            <Link to ='/update'>
                         
                            <Table.Cell>
                                <Button  onClick={() => setData(data)}>Update</Button>
                            </Table.Cell>
                            </Link>
                        </Table.Row>
                    )
                })
                }
            </Table.Body>


        </Table>
    )


}

export default Read
