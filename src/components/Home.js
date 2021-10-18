import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Rating, Card, Icon, Image, Table, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function Read() {
    const [APIData, setAPIData] = useState([]);
    const [order, setOrder] = useState("ASC")
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const setData = (data) => {
        let { id, firstName, lastName, rating, image, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Rating', rating);
        localStorage.setItem('image', image);
        localStorage.setItem('Checkbox Value', checkbox);
    }

    //sorting part

    const sortingASC = (col) => {
        if (order == "ASC") {
            const sorted = [...APIData].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setAPIData(sorted);
            setOrder("DSC");
        }

    }

    const sortingDSC = (col) => {

        if (order == "DSC") {
            const sorted = [...APIData].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
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

    //searchInput
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((data) => {
                return Object.values(data).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }

    //searchInput

    return (

        <div style={{ padding: 20 }}>
            <button type="button" onClick={() => sortingASC("rating")}>Less popular</button>
            <button type="button" onClick={() => sortingDSC("rating")}>Popular</button>
            <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchInput.length > 1 ? (
                    filteredResults.map((data) => {
                        return (
                            <Card>
                                <Image src={data.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{data.firstName}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{data.rating}</span>
                                    </Card.Meta>
                                    <Card.Description>

                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user' />
                                        <Rating maxRating={5} defaultRating={data.rating} icon='star' size='mini' />
                                    </a>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                        APIData.map((data) => {
                            return (
                                <Card>
                                    <Image src={data.image} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{data.firstName}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>   </span>
                                        </Card.Meta>
                                        <Card.Description>
                                           {data.rating}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='user' />
                                            <Rating maxRating={5} defaultRating={data.rating} icon='star' size='mini' />
                                        </a>
                                    </Card.Content>
                                </Card>
                            )
                        })
                    )}
            </Card.Group>
        </div >
    )
}



export default Read
