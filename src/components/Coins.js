import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../index'
import { Button, Container, HStack, Radio, RadioGroup,  } from '@chakra-ui/react';
import Loader from './Loader.js';
import CoinCard from './CoinCard.js';
import ErrorComponent from './ErrorComponent.js';


const Coins = () => {
  const [loading, setLoading] = useState(true) 
  const [coins, setCoins] = useState([]) 
  const [error, setError] = useState(false) 
  const [page, setPage] = useState(1) 
  const [currency, setCurrency] = useState("inr") 
  const currency_symbol= currency==='inr'?'₹':currency==='eur'?'€':'$'
  const changePage=(number)=>{
    setPage(number)
    setLoading(true)

  }
  const btns = new Array(100).fill(1)
  
  useEffect(() => {
  
     const fetchCoins =async()=>{ 
      try {
        const {data} = await axios.get(`${api}/coins/markets?vs_currency=${currency}&page=${page}`)
        setLoading(false)
        setCoins(data)
      } catch (error) {
        setError(true)
        setLoading(false)
        
      }

     }
     fetchCoins()
  
  },[currency,page]);

  if(error) return <ErrorComponent message={'Error while fetching Coins'}/>
  return (
    <>
     <Container  minH={'100vh'} maxW={'container.xl'} >
      {loading ? <Loader/> : <>

      <RadioGroup p={'8'} value={currency} onChange={setCurrency}>
        <HStack spacing={'4'}>
          <Radio value={'inr'}>INR</Radio>
          <Radio value={'usd'}>USD</Radio>
          <Radio value={'eur'}>EUR</Radio>
        </HStack>
      </RadioGroup>
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>

      {coins.map((item)=>(
        <CoinCard key={item.id} name={item.name} img={item.image} symbol={item.symbol} current_price={item.current_price} id={item.id} currency_symbol={currency_symbol}/>
      ))}
      </HStack>
      <HStack  p={'8'} overflowX={'auto'} w={'full'}>
        {btns.map((item,i)=>(
        <Button key={i} onClick={()=>changePage(i+1)} bgColor={'blackAlpha.900'} color={'white'}>{i+1}</Button>

        ))}

      </HStack>

      </>}
     </Container>
    </>
  )
}



export default Coins
