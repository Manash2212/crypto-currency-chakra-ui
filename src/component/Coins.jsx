import React, { useEffect, useState } from 'react'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index'
import Loader from './Loader';
import CoinCard from './CoinCard';
import ErrorComponent from './ErrorComponent';

const Coins = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currencey, setCurrencey] = useState("inr")

  const currencysymbol = currencey === 'inr' ? "₹" : currencey === 'eur' ? "€" : '$'

  const changePage = (page) => {
    setPage(page)
    setLoading(true)

  }

  const btns = new Array(105).fill(0)

  useEffect(() => {

    const fetchCoins = async () => {

      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currencey}&page=${page}`)
        // console.log(data)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)

      }
    }
    fetchCoins()
  }, [currencey, page])

  if (error) return <ErrorComponent data={"Not able to fetch the Coin Data"} />

  return (

    <Container maxW={'container.xl'}>

      {loading ? (<Loader />) : (
        <>

          <RadioGroup value={currencey} onChange={setCurrencey} p={'8'}>
            <HStack>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>


          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map(e => (
              <CoinCard
                key={e.id}
                id={e.id}
                name={e.name}
                image={e.image}
                symbol={e.symbol}
                price={e.current_price}
                currencysymbol={currencysymbol}
              />
            ))}
          </HStack>

          <HStack w={'full'} overflowX={'auto'} p={'8'}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={'white'}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )
      }
    </Container >

  )
}
export default Coins



