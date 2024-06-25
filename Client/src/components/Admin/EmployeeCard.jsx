import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, HStack, Badge, Button, Flex, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select } from '@chakra-ui/react';
import { IoMdAdd } from "react-icons/io";
import { useDisclosure } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { assignEmployeeTicket } from '../../features/employee/employeeAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllDBTicketsByAdmin } from '../../features/ticket/ticketAction';
import TicketModel from './TicketModel';
import {getPendingTickets} from "../../features/ticket/ticketAction"

// Show Detail of individual employee 
export default function EmployeeCard({ emp }) {
  const [assignedTicket, setAssignedTicket] = useState(0);
  const [ticketId, setTicketId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  
  const tickes = useSelector(state => state.ticket.currrentUserTicket);
  let pendingTickets = tickes.filter(ticket => !ticket.assigned);
  const error = useSelector(state => state.employee.error);

  useEffect(() => {
    dispatch(getAllDBTicketsByAdmin());
    pendingTickets = tickes.filter(ticket => !ticket.assigned);
  }, [assignEmployeeTicket]);

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

  const handleOpenModal = (empId) => {
    // dispatch(getPendingTickets());
    // pendingTickets = useSelector(state => state.ticket.currrentUserTicket);
    setEmployeeId(empId);
    onOpen();
  };

  const handleSubmit = () => {
    setAssignedTicket(assignedTicket + 1);
    setTicketId("");
    handleAssign();
    response();
    onClose();
  };

  return (
    <Box className="employeeCard" width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" maxH={"250px"}>
      <Text marginBottom="10px" color="white" fontSize="xs" p={1} bg="green">
        {emp._id}
      </Text>

      <VStack spacing={4} align="start" color="black" px="15px" py="15px">
        <Heading size="md">{emp.username}</Heading>
        <Text fontSize="sm">{emp.position} - {emp.department}</Text>
        <Text fontSize="sm">{emp.email}</Text>
        <HStack spacing={2}>
          <Badge colorScheme="blue">{emp.role}</Badge>
          <Badge colorScheme="green">Tickets: {emp.assignedTickets ? emp.assignedTickets.length : 0}</Badge>
        </HStack>

        <Flex justifyContent="center" alignItems="center">
          <Button onClick={() => handleOpenModal(emp._id)}>
            <IoMdAdd /> Assign Ticket to Employee
          </Button>
        </Flex>

        <TicketModel 
          isOpen={isOpen} 
          onClose={onClose} 
          setTicketId={setTicketId} 
          handleSubmit={handleSubmit} 
          ticketId={ticketId}
          pendingTickets={pendingTickets}
        />
      </VStack>
    </Box>
  );
}
