import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Component to assigned ticket to Employee depending on ticket id
//  1 bug 
export default function EmployeeModel({ isOpen, onClose, setEmployeeId, handleSubmit, employeeId ,employeeList}) {
  // const [pendingTickets, setPendingTickets] = useState([]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Employee  to Tickets</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Employee ID</FormLabel>
            <Select
              placeholder="Select Employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              {employeeList.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee._id}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
