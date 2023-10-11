import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../index'
import { Container, HStack,  } from '@chakra-ui/react';
import Loader from './Loader.js';
import ExchangeCard from './ExchangeCard.js';
import ErrorComponent from './ErrorComponent.js';


const Exchanges = () => {
  const [loading, setLoading] = useState(true) 
  const [exchanges, setExchanges] = useState([]) 
  const [error, setError] = useState(false) 
  useEffect(() => {
  
     const fetchExchanges =async()=>{ 
      try {
        const {data} = await axios.get(`${api}/exchanges`)
        setLoading(false)
        setExchanges(data)
      } catch (error) {
        setError(true)
        setLoading(false)
        
      }

     }
     fetchExchanges()
  
  },[]);

  if(error) return <ErrorComponent message={'Error while fetching Exchanges'}/>
  return (
    <>
     <Container  minH={'100vh'} maxW={'container.xl'} >
      {loading ? <Loader/> : <>
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>

      {exchanges.map((item)=>(
        <ExchangeCard key={item.id} name={item.name} img={item.image} url={item.url} rank={item.trust_score_rank
        }/>
      ))}
      </HStack>

      </>}
     </Container>
    </>
  )
}

export default Exchanges
