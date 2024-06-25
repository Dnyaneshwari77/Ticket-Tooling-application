import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Component to assigned ticket to Employee depending on ticket id
//  1 bug 
export default function TicketModal({ isOpen, onClose, setTicketId, handleSubmit, ticketId ,pendingTickets}) {
  // const [pendingTickets, setPendingTickets] = useState([]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Ticket to Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Ticket ID</FormLabel>
            <Select
              placeholder="Select Ticket"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
            >
              {pendingTickets.map((ticket) => (
                <option key={ticket._id} value={ticket._id}>
                  {ticket._id}
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
