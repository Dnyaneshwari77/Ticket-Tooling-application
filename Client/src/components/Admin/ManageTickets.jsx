import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { assignEmployeeTicket } from '../../features/employee/employeeAction' // Import the action
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Interface  to assign tickets to employee using employee id and userid
export default function ManageTickets() {
  const [ticketId, setTicketId] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const dispatch = useDispatch()

  const error = useSelector(state => state.employee.error)


const response=()=>
  {
    if (!error) {
      toast.success("Ticket Assigned successfully")
    }
    if (error) {
      toast.error("Something went wrong")
    }
  }


  const handleAssign = () => {
    dispatch(assignEmployeeTicket({ ticket_id: ticketId, employee_id: employeeId }));
    response();
  }
   

  return (
    <Box maxWidth="400px" margin="auto" padding="6" boxShadow="md" borderRadius="md" bg="white">
      <Heading as="h2" size="lg" mb="6" textAlign="center" marginBottom={"10px"}>
        Manage My Tickets
      </Heading>
      <VStack spacing="4">
        <FormControl>
          <FormLabel>Ticket ID</FormLabel>
          <Input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter Ticket ID"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Employee ID</FormLabel>
          <Input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleAssign}>
          Assign
        </Button>
      </VStack>
    </Box>
  )

}
