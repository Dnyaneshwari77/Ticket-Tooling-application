
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { ticketGenerate } from '../../features/ticket/ticketAction';
import {toast} from "react-toastify"

// Ticket model to show form for ticket generation
export default function TicketInputForm({ inputForm, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    attachment: '',
    priority: 'medium',
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ticket);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(ticketGenerate(formData));
    onClose(); 
    toast.success("Sucessfully generated ticket")
  };

  return (
    <Modal isOpen={inputForm} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Generate Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Attachment</FormLabel>
            <Input type="text" name="attachment" value={formData.attachment} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Priority</FormLabel>
            <Select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>Submit</Button>
          {error && <Text color="red.500">{error}</Text>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
