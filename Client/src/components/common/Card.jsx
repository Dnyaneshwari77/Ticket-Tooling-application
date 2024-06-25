import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

//  Common Card components shown on dashboard
export default function Card({ solved, pending, total, name }) {
  let bgColor = '';
  let content = '';
  let title='';

  switch (name) {
    case 'total_vs_solved':
      bgColor = 'lightblue';
      content = `${total}/${solved}`;
      title="Total Vs Solved"
      break;
    case 'solved':
      bgColor = 'lightgreen';
      content = solved;
      title="Solved"
      break;
    case 'pending':
      bgColor = 'salmon';
      content = pending;
      title="Pending";
      break;
    default:
      bgColor = 'lightblue';
      content = '';
  }

  return (
    <Flex
      width="200px"
      height="7em"
      bg={bgColor}
      borderRadius={"10px"}
      alignItems="center"
      justifyContent="space-evenly"
      flexDir={"column"}
      className='card glass-effect'
    
       
    >
      <motion.div 
      initial={{ opacity: 0, }} 
      animate={{ opacity: 1, y: 0 }}   
      transition={{ duration: 1 }}
      
      style={{textAlign:"center"}}>
          <Text  fontSize={20} fontStyle={"bold"} fontWeight={700}>{title}</Text>
          <Text fontStyle={"bold"} fontWeight={700}>{content}</Text>
      </motion.div>
   
    </Flex>
  );
}
