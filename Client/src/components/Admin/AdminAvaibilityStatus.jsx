import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  getFilterEmployee} from '../../features/employee/employeeAction';
import { Box, Select, Flex, Text } from '@chakra-ui/react';

const AdminAvaibilityStatus = () => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(getFilterEmployee({ status: e.target.value }));
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="md" bg="lightgray" mb={4} minH={"100px"}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="lg" mb={2}>Filter by Status:</Text>
          <Select placeholder="Select status" onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="busy">Busy</option>
            <option value="available">Available</option>
            
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminAvaibilityStatus;
