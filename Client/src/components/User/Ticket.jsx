import { Button, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

// Individual Tickets summary 
export default function Ticket({ ticket ,onClick}) {
  return (
    <Flex
    width={{ base: "100%", lg: "70%" }} 
      justifyContent={"space-between"}
      p={5}
      borderRadius={5}
      alignItems={"center"}
      mb={10}
      className='ticketSummary'
      onClick={onClick}
      cursor={"pointer"}
    >
      <Text>{ticket.title}</Text>
      <Flex px={3} justifyContent={"space-evenly"} alignItems={"center"} gap={5} >
        <Text px={4} py={2} bg={"lightgray"} minW={"100px"} maxW={"100px"} borderRadius={"10px"}>{ticket.Status}</Text>
        <Text  px={4} py={2}  minW={"100px"} maxW={"100px"}borderRadius={"10px"} textAlign={"center"} bg={"gray"} color={"white"}>{(ticket.priority).toUpperCase()}</Text>
      </Flex>
    </Flex>
  );
}
