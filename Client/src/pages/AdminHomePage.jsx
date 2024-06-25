import React, { useState } from "react";
import {
  Flex,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import NavBar from "../components/common/NavBar";
import Dashboard from "../components/Admin/Dashboard";
import AllTickets from "../components/Admin/AllTickets";
import ManageTickets from "../components/Admin/ManageTickets";
import AllEmployeeList from "../components/Admin/AllEmployeeList";
import { IoMenu } from "react-icons/io5";
import { IconButton } from "@chakra-ui/react";
export default function AdminHomePage() {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Flex minHeight="100vh" flexDir="column">
      <NavBar onDrawerOpen={handleDrawerOpen} />
      <Drawer
        placement="left"
        onClose={handleDrawerClose}
        isOpen={isDrawerOpen}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Flex flexDir="column">
                <Text
                  p={5}
                  fontSize={16}
                  width="90%"
                  textAlign="center"
                  bg="lightblue"
                  mb="30px"
                  borderRadius="3px"
                  mt="20px"
                  onClick={() => {
                    setActiveLink("Dashboard");
                    handleDrawerClose();
                  }}
                  cursor="pointer"
                >
                  Dashboard
                </Text>
                <Text
                  p={5}
                  fontSize={16}
                  width="90%"
                  textAlign="center"
                  bg="lightblue"
                  mb="30px"
                  borderRadius="3px"
                  onClick={() => {
                    setActiveLink("allTickets");
                    handleDrawerClose();
                  }}
                  cursor="pointer"
                >
                  All ticket
                </Text>
                <Text
                  p={5}
                  fontSize={16}
                  width="90%"
                  textAlign="center"
                  bg="lightblue"
                  mb="30px"
                  borderRadius="3px"
                  onClick={() => {
                    setActiveLink("manageTicket");
                    handleDrawerClose();
                  }}
                  cursor="pointer"
                >
                  Manage Ticket
                </Text>
                <Text
                  p={5}
                  fontSize={16}
                  width="90%"
                  textAlign="center"
                  bg="lightblue"
                  mb="30px"
                  borderRadius="3px"
                  onClick={() => {
                    setActiveLink("allEmployeeList");
                    handleDrawerClose();
                  }}
                  cursor="pointer"
                >
                  All Employee
                </Text>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Flex flex="1">
        <IconButton
          margin={"5px"}
          zIndex={99}
          position={"absolute"}
          icon={<IoMenu />}
          onClick={handleDrawerOpen}
          bg={"lightgray"}
          aria-label="Open Menu"
          variant="ghost"
          size="lg"
          fontSize="2xl"
          color="teal.500"
          _hover={{ bg: "teal.100" }}
          _active={{ bg: "teal.200" }}
        />

        <Flex
          flex="1"
          p="20px"
          justifyContent="center"
          minWidth={"100%"}
          height={"auto"}
        >
          {activeLink === "Dashboard" && <Dashboard />}
          {activeLink === "allTickets" && <AllTickets />}
          {activeLink === "manageTicket" && <ManageTickets />}
          {activeLink === "allEmployeeList" && <AllEmployeeList />}
        </Flex>
      </Flex>
    </Flex>
  );
}
