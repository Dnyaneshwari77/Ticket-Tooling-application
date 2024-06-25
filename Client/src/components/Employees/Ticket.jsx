import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import EditTicketModal from './EditTicketModal';

// Get single Ticket Summary Details
export default function Ticket({ ticket, onClick, onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex
        width={{ base: "100%", lg: "70%" }} 
        justifyContent="space-between"
        p={{ base: 3, md: 5 }}
        borderRadius={5}
        alignItems="center"
        mb={{ base: 5, md: 10 }}
       
        boxShadow="md"
        className="ticketSummary"
        position="relative"
        flexDirection={{ base: "column", md: "row" }} 
      >
        <Flex
          onClick={onClick}
          cursor={"pointer"} 
          width={{ base: "100%", md: "90%" }}
          justifyContent={"space-between"} 
          alignItems={"center"}
          
        >
          <Text>{(ticket.title).toUpperCase()}</Text>
          <Flex px={3} justifyContent={"space-evenly"} alignItems={"center"} gap={5} display={{base:"none",md:"flex"}}>
            <Text px={4} py={2} bg={"lightgray"} minW={"100px"} maxW={"100px"} borderRadius={"10px"} textAlign={"center"}>{ticket.Status.toUpperCase()}</Text>
            <Text px={4} py={2} minW={"100px"} maxW={"100px"} borderRadius={"10px"} textAlign={"center"} bg={"gray"} color={"white"}>{(ticket.priority).toUpperCase()}</Text>
          </Flex>
        </Flex>
        <Button p={3} onClick={handleEditClick} alignSelf={"flex-end"}><FaEdit /></Button>
      </Flex>

      <EditTicketModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        ticket={ticket} 
        onSave={onSave}
      />
    </>
  );
}
