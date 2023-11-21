import React from 'react'
import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom'


const CoinCard = ({ id, name, image, symbol, price, currencysymbol = "₹" }) => {
    return (
        <Link to={`/coin/${id}`}>
            <VStack
                w={'52'}
                shadow={'lg'}
                p={'8'}
                borderRadius={'lg'}
                transition={'all 0.3s'}
                m={'4'}
                css={{
                    '&:hover': {
                        transform: "scale(1.1)"
                    }
                }}
            >
                <Image
                    src={image}
                    w={'10'}
                    h={'10'}
                    objectFit={'contain'}
                    alt='Exchanges' />
                <Heading size={'md'} noOfLines={1} textTransform={'uppercase'}>
                    {symbol}
                </Heading>
                <Text noOfLines={1} >
                    {name}
                </Text>
                <Text noOfLines={1}>
                    {price ? `${currencysymbol}${price}` : 'NA'}
                </Text>
            </VStack>
        </Link>
    )
}

export default CoinCard
