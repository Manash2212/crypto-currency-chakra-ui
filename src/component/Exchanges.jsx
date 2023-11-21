import React, { useEffect, useState } from 'react'
import { Container, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index'
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {

        const fetchExchanges = async () => {

            try {
                const { data } = await axios.get(`${server}/exchanges?per_page=200`)
                console.log(data)
                setExchanges(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)

            }
        }
        fetchExchanges()
    }, [])

    if(error) return <ErrorComponent data={'Nota able to fetch the Exchange Data'}/>

    return (

        <Container maxW={'container.xl'} >

            {loading ? (<Loader />) : (<>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {exchanges.map(e => (
                        <ExchangeCard
                            key={e.id}
                            name={e.name}
                            image={e.image}
                            rank={e.trust_score_rank}
                            url={e.url}
                        />
                    ))}
                </HStack>
            </>
            )}
        </Container>

    )
}


export default Exchanges

