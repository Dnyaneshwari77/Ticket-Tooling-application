import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllDBTicketsByAdmin ,getFilterTickets} from "../../features/ticket/ticketAction";

import Ticket from "./Ticket";
import TicketDetail from "./TicketDetail";
import NotificationList from "./NotificationList";

import { Box, Text ,Flex} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import FilterComponent from "../common/FilterComponent";
import { getAllEmployeeList } from "../../features/employee/employeeAction";

export default function AllTickets() {

  const dispatch = useDispatch();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedTicket, setAssignedTicket] = useState(0);

  const loadTickets = () => {
    dispatch(getAllDBTicketsByAdmin());
  };

  const loadFillterTickets=()=>
    {
      dispatch(getFilterTickets({status:"all"}));
    }


 

const currentTickets = useSelector(
      (state) => state.ticket.currrentUserTicket
    );
  
    useEffect(()=>
    {
      dispatch(getAllEmployeeList())
    },[])
 
  useEffect(() => {
    loadTickets();
    loadFillterTickets();
  }, [assignedTicket]);

  const handleTokenClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  

  const fillterTickets=useSelector((state)=>state.ticket.filterTickets);

  const closeModal=()=>
    {
      setIsModalOpen(false);
    }
  return (
    <Box width={"100%"}>
     <FilterComponent/>
     <Flex justifyContent={"center"}  alignItems={"center"} width={"100%"} paddingTop={"10px"} flexDir={"column"} >
  
 

  {fillterTickets && fillterTickets.length > 0 ? (
    fillterTickets.map((ticket) => (
      <Ticket
        key={ticket._id}
        ticket={ticket}
        onClick={() => handleTokenClick(ticket)}
        setAssignedTicket={setAssignedTicket}
        assignedTicket={assignedTicket}
      />
    ))
  ) : (
    <Text>No tickets available</Text>
  )}
  {selectedTicket && (
    <TicketDetail
      isOpen={isModalOpen}
      onClose={closeModal}
      ticket={selectedTicket}
    />
  )}
</Flex>
    </Box>
   
  );
}
