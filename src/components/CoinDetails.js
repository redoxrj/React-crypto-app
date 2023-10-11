import React, { useEffect, useState } from 'react'
import Loader from './Loader.js';
import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import axios from 'axios'
import {api} from '../index'
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent.js';
import Chart from "./Chart.js";



const CoinDetails = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(true)  
  const [coin, setCoin] = useState({}) 
  const [error, setError] = useState(false) 
  const [page, setPage] = useState(1) 
  const [currency, setCurrency] = useState("inr") 
  const currency_symbol= currency==='inr'?'₹':currency==='eur'?'€':'$'
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
  
    const fetchCoin =async()=>{ 
     try {
       const {data} = await axios.get(`${api}/coins/${id}`)
       const { data: chartData } = await axios.get(
        `${api}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setChartArray(chartData.prices);
       setLoading(false)
       setCoin(data)
     } catch (error) {
       setError(true)
       setLoading(false)
       
     }

    }
    fetchCoin()
 
 },[id,currency,days]);

 if(error) return <ErrorComponent message={`Error while fetching ${id}`}/>

  return (
    <Container maxW={'container.lg'} >
    {loading ? <Loader/> : <> 
    <Box w={'full'} borderWidth={'1'}>
    <Chart arr={chartArray} currency={currency_symbol} days={days} />

    </Box>
    <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>
    <RadioGroup p={'8'} value={currency} onChange={setCurrency}>
        <HStack spacing={'4'}>
          <Radio value={'inr'}>INR</Radio>
          <Radio value={'usd'}>USD</Radio>
          <Radio value={'eur'}>EUR</Radio>
        </HStack>
      </RadioGroup>

      <VStack p={'16'} spacing={'4'} alignItems={'flex-start'}  >
        <Text fontSize={'small'} alignSelf={'center'} opacity={0.8}>Last Updated on {Date(coin.market_data.last_updated).split('G')[0]}</Text>
        <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}/>

        <Stat>
          <StatLabel>{coin.name}</StatLabel>
          <StatNumber>{currency_symbol}{coin.market_data.current_price[currency]}</StatNumber>
        <StatHelpText>
          <StatArrow type={coin.market_data.price_change_percentage_24h>0?'increase':'decrease'}/>
          {coin.market_data.price_change_percentage_24h}
        </StatHelpText>
        </Stat>

        <Badge fontSize={'xl'} bgColor={'blackAlpha.900'} color={'white'}>{`#${coin.market_cap_rank}`}</Badge>

        <CustomBar high={`${currency_symbol}${coin.market_data.high_24h[currency]}`} low={`${currency_symbol}${coin.market_data.low_24h[currency]}`}/>

        <Box w={'full'} p={'4'} >
          <Item title={'Max Supply'} value={coin.market_data.max_supply}/>
          <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
          <Item title={'Market Cap'} value={`${currency_symbol}${coin.market_data.market_cap[currency]}`}/>
          <Item title={'All Time High'} value={`${currency_symbol}${coin.market_data.atl[currency]}`}/>
          <Item title={'All Time Low'} value={`${currency_symbol}${coin.market_data.ath[currency]}`}/>

        </Box>


      </VStack>
    </>}
    </Container>
  )
}

const Item =({title,value})=>(
  <HStack w={'full'} justifyContent={'space-between'} my={'4'}>
    <Text letterSpacing={'widest'} fontFamily={'Bebas Neue'}>{title}</Text>
    <Text >{value}</Text>

  </HStack>

)

const CustomBar =({high,low})=>(
  <VStack w={['full']}>
    <Progress value={'50'} colorScheme={'teal'} width={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge colorScheme={'red'}>{low}</Badge>
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge colorScheme={'green'}>{high}</Badge>
    </HStack>
  </VStack>
)

export default CoinDetails
