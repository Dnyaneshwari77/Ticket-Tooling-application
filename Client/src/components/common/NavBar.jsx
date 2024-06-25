import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Select, // Import Select component from Chakra UI
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authActions"; // Import action to update availability
import {updateEmployeeStatus} from "../../features/employee/employeeAction"
import { FaBell, FaBars } from "react-icons/fa";
import NotificationList from "../Admin/NotificationList";

const NavBar = ({ height }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const avaiability = useSelector((state) => state.auth.avaibality);

  const logOut = () => {
    dispatch(logoutUser());
    if (role === "user") {
      navigate("/");
    } else {
      navigate("/employee/login");
    }
  };

  const handleAvailabilityChange = (e) => {
    const newAvailability = e.target.value;
    console.log(newAvailability)
    dispatch(updateEmployeeStatus(newAvailability));
  };

  return (
    <>
      <Box
        p={5}
        className="glass-effect"
        borderRadius={"0px"}
        height={height}
        minWidth={"100%"}
        zIndex={99}
      >
        <Flex align="center" justify="space-between">
          <Box border="10px solid lightblue" p={4}>
            <Heading
              fontSize={{ base: "16px", md: "20px" }}
              px={{ base: 2, md: 10 }}
            >
              Ticket Tool
            </Heading>
          </Box>
          <Spacer display={{ base: "none", md: "flex" }} />
          <Flex align="center" display={{ base: "none", md: "flex" }}>
            <Avatar name="User Profile" src="path-to-profile-image" mr={4} />
            <Popover>
              <PopoverTrigger>
                <IconButton
                  icon={<FaBell />}
                  colorScheme="teal"
                  variant="outline"
                  mr={4}
                  aria-label="Notifications"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Notifications</PopoverHeader>
                <PopoverBody>
                  <NotificationList />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button
              colorScheme="teal"
              variant="outline"
              size="md"
              fontWeight="bold"
              _hover={{ bg: "teal.500", color: "white" }}
              _active={{ bg: "teal.600" }}
              marginRight={"10px"}
             width={"120px"}
              onClick={logOut}
            >
              Logout
            </Button>
            {avaiability &&  <Select
                value={avaiability}
                color={"white"}
                textAlign={"center"}
                onChange={handleAvailabilityChange}
                bg={avaiability === "available" ? "green" : "red"}
                width="100%"
                justifyContent="flex-start"
              >
                <option value="available" style={{color:"black"}}>Available</option>
                <option value="busy" style={{color:"black"}}>Busy</option>
              </Select> }
           
          </Flex>
            
             
          <IconButton
            icon={<FaBars />}
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            aria-label="Open Menu"
          />
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Avatar name="User Profile" src="path-to-profile-image" />
              <Popover>
                <PopoverTrigger>
                  <Button
                    leftIcon={<FaBell />}
                    colorScheme="teal"
                    variant="outline"
                    width="100%"
                    justifyContent="flex-start"
                  >
                    Notifications
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Notifications</PopoverHeader>
                  <PopoverBody>
                    <NotificationList />
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              {avaiability &&  <Select
                value={avaiability}
                color={"white"}
                textAlign={"center"}
                onChange={handleAvailabilityChange}
                bg={avaiability === "available" ? "green" : "red"}
                width="100%"
                justifyContent="flex-start"
              >
                <option value="available" style={{color:"black"}}>Available</option>
                <option value="busy" style={{color:"black"}}>Busy</option>
              </Select> }

              <Button
                colorScheme="teal"
                variant="outline"
                width="100%"
                onClick={logOut}
              >
                Logout
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
