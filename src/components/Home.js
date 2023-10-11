import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import img from '../btc.png'
import {motion} from 'framer-motion'

const Home = () => {
  return (
    <Box  h={'60vh'} w={'full'} bgColor={'blackAlpha.900'}> 
    <motion.div style={{
      height: '60vh',
    }}
    animate={{
      translateY: "20px",
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    >

      <Image w={'full'} h={'full'} objectFit={'contain'} src={img}/>
    </motion.div>

      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.800'} mt={'-10'}>CryptoX</Text>

    </Box>
  )
}

export default Home
