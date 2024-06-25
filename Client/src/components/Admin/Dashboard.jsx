import React, { useEffect } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Card from "../common/Card";
import { useSelector, useDispatch } from "react-redux";
import TicketPieChart from "../common/TicketPieChart";
import { getAllDBTicketsByAdmin } from "../../features/ticket/ticketAction";
import AssignedVsNotAssignedPieChart from "./AssignedVsNotAssignedPieChart";
import CardContainer from "../common/CardContainer";
import { wrap } from "framer-motion";

// Dashboard for Admin
export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDBTicketsByAdmin());
  }, []);

  const currentTicket = useSelector((state) => state.ticket.currrentUserTicket);
  console.log(currentTicket);

  const solvedCount = currentTicket.filter(
    (ticket) => ticket.Status === "Solved"
  ).length;
  const pendingCount = currentTicket.filter(
    (ticket) => ticket.Status === "Pending"
  ).length;
  const totalCount = currentTicket.length;

  const assignedCount = currentTicket.filter(
    (ticket) => ticket.assigned === true
  ).length;
  const notassignedCount = totalCount - assignedCount;

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

      <Flex
        mt={10}
        alignItems="center"
        maxW="100%"
        maxH="300px"
        justifyContent="center"
      
        gap={10}
        flexWrap="wrap"
        flexDirection={{ base: "row", lg: "column" }}
      >
        <Box>
          <TicketPieChart
            solved={solvedCount}
            pending={pendingCount}
            total={totalCount}
            width={"250px"}
            height={"250px"}
          />
        </Box>
        <Box>
          {" "}
          <AssignedVsNotAssignedPieChart
            assigned={assignedCount}
            notassigned={notassignedCount}
            width={"250px"}
            height={"250px"}
          />
        </Box>
      </Flex>

    
    </Flex>
  );
}
