import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFilterTickets } from '../../features/ticket/ticketAction';
import { Box, Select, Flex, Text } from '@chakra-ui/react';

const FilterComponent = () => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(getFilterTickets({ status: e.target.value }));
  };


  const handleSortChange = (e) => {
    dispatch(getFilterTickets({ sortByDate: e.target.value === 'asc' }));
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="md" bg="lightgray" mb={4} minH={"100px"}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="lg" mb={2}>Filter by Status:</Text>
          <Select placeholder="Select status" onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
            <option value="pending">Pending</option>
          </Select>
        </Box>
        {/* <Box>
          <Text fontSize="lg" mb={2}>Sort by Date:</Text>
          <Select onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default FilterComponent;
