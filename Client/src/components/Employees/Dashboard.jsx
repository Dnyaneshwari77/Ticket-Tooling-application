import React ,{useEffect} from 'react'
import {Box,Flex,Text,Image} from '@chakra-ui/react'
import { useSelector ,useDispatch} from 'react-redux'
import TicketPieChart from "../common/TicketPieChart"
import CardContainer from '../common/CardContainer'
import { getAllTicketsOfEmployee } from '../../features/ticket/ticketAction'

// Dashboard For Employee
export default function Dashboard() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTicketsOfEmployee());
  }, []);

  const currentTicket=useSelector(state=>state.ticket.currrentUserTicket);
  console.log(currentTicket)

  const solvedCount = currentTicket.filter(ticket => ticket.Status === 'Solved').length;
  const pendingCount = currentTicket.filter(ticket => ticket.Status === 'Pending').length;
  const totalCount = currentTicket.length;

  return (
    <Flex  
    width={"100%"}
    p={9}
    borderRadius={5}
    justifyContent={"center"}
    alignContent={"center"}
    flexWrap={"wrap"}>
    <CardContainer totalCount={totalCount} solvedCount={solvedCount} pendingCount={pendingCount}/>
     
      <Flex  mt={10}
        alignItems="center"
        maxW="100%"
        maxH="300px"
        justifyContent="center"
        gap={10}
        flexWrap="wrap"
        flexDirection={{ base: "row", lg: "column" }}>
          
          {totalCount>0?  <TicketPieChart
          solved={solvedCount}
          pending={pendingCount}
          total={totalCount}
          width={"500px"}
          height={"500px"}
        />:<Text color={"lightblue"}>You have No Ticket Raise Yet</Text>}
          
     
      </Flex>
    </Flex>

  )
}
