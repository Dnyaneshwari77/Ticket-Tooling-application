import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import { useDisclosure } from '@chakra-ui/react';
import { useSelector,useDispatch } from "react-redux";
import { FaRegShareFromSquare } from "react-icons/fa6";
import EmployeeModel from "./EmployeeModel";
import {toast} from "react-toastify"
import { assignEmployeeTicket } from "../../features/employee/employeeAction";

// Show individual ticket summary
export default function Ticket({ ticket, onClick, setAssignedTicket ,assignedTicket}) {
  
  const dispatch=useDispatch();

 
  const [ticketId, setTicketId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "unsolved":
        return "red.400";
      case "in progress":
        return "yellow.500";
      case "solved":
        return "green.500";
      default:
        return "gray.500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "red.600";
      case "medium":
        return "yellow.600";
      case "low":
        return "green.600";
      default:
        return "gray.600";
    }
  };

  const employeeIds = useSelector(state => state.employee.employeeList);
  const employeeNotBusy=employeeIds.filter((employee)=> employee.avaibality!="busy")
  // let pendingTickets = tickes.filter(ticket => !ticket.assigned);
  const error = useSelector(state => state.employee.error);



  const handleAssign = () => {
    dispatch(assignEmployeeTicket({ ticket_id: ticketId, employee_id: employeeId }));
  };


  const response = () => {
    if (!error) {
      toast.success("Ticket Assigned successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleOpenModal = (ticketId) => {
    setTicketId(ticketId);
    onOpen();
  };

  const handleSubmit = () => {
    setAssignedTicket((prvVale)=> prvVale+1);
    setEmployeeId("");
    handleAssign();
    response();
    onClose();
  };


  return (
    <Flex
      width={{ base: "100%", lg: "70%" }}
      justifyContent="space-between"
      p={{ base: 3, md: 5 }}
      bg={ticket.assigned ? "#ccd5ae" : "#faedcd"}
     
      borderRadius={5}
      alignItems="center"
      mb={{ base: 5, md: 10 }}
      // bg={useColorModeValue('white', 'gray.700')}
      boxShadow="md"
      className="ticketSummary"
      position="relative"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        onClick={onClick}
        cursor="pointer"
        width={{ base: "100%", md: "90%" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold" mb={{ base: 2, md: 0 }}>
          {ticket.title}
        </Text>
        <Flex
          px={3}
          justifyContent="space-evenly"
          alignItems="center"
          gap={5}
          flexDir={{ base: "column", md: "row" }}
        >
          <Text
            px={4}
            py={2}
            bg={getStatusColor(ticket.Status)}
            minW={{ base: "auto", md: "130px" }}
            maxW="100px"
            borderRadius="10px"
            textAlign="center"
            color="white"
          >
            {ticket.Status.toUpperCase()}
          </Text>
          <Text
            px={4}
            py={2}
            minW={{ base: "auto", md: "100px" }}
            maxW="100px"
            borderRadius="10px"
            textAlign="center"
            bg={getPriorityColor(ticket.priority)}
            color="white"
          >
            {ticket.priority.toUpperCase()}
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent="center" alignItems="center" display={ticket.assigned?"none":"block"}>
        <Button onClick={() => handleOpenModal(ticket._id)}>
        <FaRegShareFromSquare  />
        </Button>
      </Flex>

      <Text
        position={{ base: "absolute", md: "absolute" }}
        top={0}
        color={"white"}
        left={0}
        fontSize="xs"
        p={1}
        bg={"green"}
      >
        {ticket._id}
      </Text>

      <EmployeeModel 
          isOpen={isOpen} 
          onClose={onClose} 
          setEmployeeId={setEmployeeId} 
          handleSubmit={handleSubmit} 
          employeeId={employeeId}
          employeeList={employeeNotBusy}
        />
    </Flex>
  );
}
