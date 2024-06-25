import React, { useEffect } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import Card from "../common/Card";
import { useSelector, useDispatch } from "react-redux";
import TicketPieChart from "../common/TicketPieChart";
import CardContainer from "../common/CardContainer";
import { getAllTickets } from "../../features/ticket/ticketAction";

//  Component to Dispay visual representaion for User ticket status
export default function Dashboard() {
  const dispatch = useDispatch();

  // Dispatch to get All Ticket from the DB only for user
  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  // Get current user Tickets
  const currentTicket = useSelector((state) => state.ticket.currrentUserTicket);

  // calculate solved ,unsolved and pending tickets
  const solvedCount = currentTicket.filter(
    (ticket) => ticket.Status === "Solved"
  ).length;
  const pendingCount = currentTicket.filter(
    (ticket) => ticket.Status === "Pending"
  ).length;
  const totalCount = currentTicket.length;

  return (
    <Flex
      width={"100%"}
      p={9}
      borderRadius={5}
      justifyContent={"center"}
      alignContent={"center"}
      flexWrap={"wrap"}
    >
      <CardContainer
        totalCount={totalCount}
        solvedCount={solvedCount}
        pendingCount={pendingCount}
      />

      <Flex mt={10} direction="column" alignItems="center" maxHeight={"300px"}>
        {/* Pie chard for pending solved and unsolved status */}
       {totalCount>0?  <TicketPieChart
          solved={solvedCount}
          pending={pendingCount}
          total={totalCount}
          width={"500px"}
          height={"500px"}
        />:<Text color={"lightblue"}>You have No Ticket Raise Yet</Text>}
      </Flex>
    </Flex>
  );
}
