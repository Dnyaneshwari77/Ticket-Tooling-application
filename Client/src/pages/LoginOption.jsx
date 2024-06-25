import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginOption() {
  const navigate = useNavigate();

  const navigateEmployeeLogin = () => {
    navigate("/login");
  };

  const navigateUserLogin = () => {
    navigate("/employee/login");
  };
  return (
    <Box width="100vw" height="100vh" bg="">
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        gap={"10px"}
      >
        <Button onClick={navigateEmployeeLogin}>Log In as User</Button>
        <Button onClick={navigateUserLogin}>Log In as Employees</Button>
      </Flex>
    </Box>
  );
}
