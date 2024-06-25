import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text } from '@chakra-ui/react';

// Model to show  ticket details
const TicketDetail = ({ isOpen, onClose, ticket }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ticket Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text><strong>Title:</strong> {ticket.title}</Text>
          <Text><strong>Description:</strong> {ticket.description}</Text>
          <Text><strong>Status:</strong> {ticket.Status}</Text>
          <Text><strong>Priority:</strong> {ticket.priority}</Text>
          <Text><strong>Assigned To:</strong> {ticket.empID || "Not yet Assigned"}</Text>
          <Text><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</Text>
          <Text><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</Text>
          <Text><strong>Attachment:</strong> {ticket.attachment && <a href={ticket.attachment} target="_blank" rel="noopener noreferrer">View Attachment</a>}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TicketDetail;
