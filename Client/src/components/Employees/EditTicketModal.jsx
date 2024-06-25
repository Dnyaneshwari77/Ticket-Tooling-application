import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { changeStatusByEmployee } from '../../features/ticket/ticketAction';
import { useDispatch ,useSelector} from 'react-redux';

// Model to ch age the status of the Tickets

export default function EditTicketModal({ isOpen, onClose, ticket, onSave }) {
  const [status, setStatus] = useState(ticket.Status);

  const payload={"id":ticket._id,"Status":status}
  
  const dispatch = useDispatch();

  const loadAssignTickets = () => {
    dispatch(changeStatusByEmployee(payload));
  };

  useEffect(() => {
    setStatus(ticket.Status);
  }, [ticket]);

  const handleSave = () => {
    // onSave({ ...ticket, Status: status });
    loadAssignTickets();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Ticket Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Unsolved">Unsolved</option>
              <option value="Pending">Pending</option>
              <option value="Solved">Solved</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
