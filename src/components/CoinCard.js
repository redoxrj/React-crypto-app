import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({id,name,img,current_price,symbol,currency_symbol='₹'}) => { 
  return (
    <Link to={`/coin/${id}`}>
<VStack w={'52'}  p={'8'} m={'4'} shadow={'lg'} transition={'all 0.5s'} css={
    {"&:hover":{
        transform : "scale(1.2)"
    }}
}>
    <Image src={img} w={'16'} h={'16'} objectFit={'contain'}/>
    <Heading size={'lg'} noOfLines={'1'}>{symbol}</Heading>

    <Text size={'md'} noOfLines={'1'}>{name}</Text>
    <Text size={'md'} noOfLines={'1'}>{current_price?`${currency_symbol}${current_price}`:'NA'}</Text>
 
</VStack>

</Link>
 
  )
}



export default CoinCard
