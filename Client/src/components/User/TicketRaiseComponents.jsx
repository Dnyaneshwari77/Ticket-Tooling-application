import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Card from "../common/Card";
import TicketInputForm from "./TicketInputForm";
import AllTickets from "./AllTickets";

// Component to Raise Tickets 
export default function TicketRaiseComponents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateTokenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Box width={"100%"} borderRadius={5}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        borderRadius={5}
        my={30}
      >
        <Button
          bg="lightblue"
          width={{ base: "100%", lg: "70%" }}
          height={"40px"}
          borderRadius={5}
          border={"none"}
          onClick={handleGenerateTokenClick}
        >
          Generate Token
        </Button>
      </Flex>
      <TicketInputForm
        inputForm={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

{/* List All Tickets related to  that Client */}
      <AllTickets />
    </Box>
  );
}
