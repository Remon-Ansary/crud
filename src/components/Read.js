import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function Read() {
    const [APIData, setAPIData] = useState([]);
    const [order,setOrder]= useState("ASC")
    const setData = (data) => {
        let { id, firstName, lastName,rating,image,checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Rating', rating);
        localStorage.setItem('image', image);
        localStorage.setItem('Checkbox Value', checkbox);
    }

//sorting part

const sortingASC = (col)=>{
    if(order == "ASC"){
        const sorted =[...APIData].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1: -1
        );
        setAPIData(sorted);
        setOrder("DSC");
    }

}

const sortingDSC = (col)=>{
   
    if(order == "DSC"){
        const sorted =[...APIData].sort((a,b)=>
        a[col].toLowerCase()<b[col].toLowerCase() ? 1: -1
        );
        setAPIData(sorted);
        setOrder("ASC");
    }

}

//sorting part end


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

        <div>
            <button type="button"  onClick={()=>sortingASC("rating")}>Less popular</button>
            <button type="button"  onClick={()=>sortingDSC("rating")}>Popular</button>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell >First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell >Rating</Table.HeaderCell>
                    <Table.HeaderCell>Checkbox</Table.HeaderCell>      
                    <Table.HeaderCell>Image</Table.HeaderCell>            
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    
                
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {APIData.map((data) => {
                    return (
                        <Table.Row>
                            <Table.Cell>{data.firstName}</Table.Cell>
                            <Table.Cell>{data.lastName}</Table.Cell>
                            <Table.Cell>{data.rating}</Table.Cell> 
                            <Table.Cell>{data.checkBox ? 'checked' : 'unChecked'}</Table.Cell>
                             <Table.Cell>{data.image}</Table.Cell>
                        
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

        </div>
    )


}

export default Read
