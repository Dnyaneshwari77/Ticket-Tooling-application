// LogInForEmployee.js
import React, { useState } from 'react';
import { Text, Flex, Image, FormControl, Input, Button, Heading, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { employeeLogin } from '../features/auth/authActions';
import { toast } from 'react-toastify';

import image from "../assets/Data_security_05.jpg";

export default function LogInForEmployee() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);

  const navigation = useNavigate();

  if (isAuthenticated && userRole === "employee") {
    navigation("/employee/home");
  } else if (isAuthenticated && userRole === "admin") {
    navigation("/admin/home");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(employeeLogin(credentials));
  };

  return (
    <Flex minHeight="100vh" width="100vw" className='mainContainer' backgroundColor={"white"} color="black">
      <Flex minHeight="100%" width="100%" flexDirection={{ base: "column", lg: "row" }}>
        {/* Image Section */}
        <Flex flex="1" bg="white" display={{ base: "none", lg: "flex" }} justifyContent={"center"} alignItems={"center"}>
          <Image
            src={image}
            alt="Sample Image"
            objectFit="cover"
            maxHeight={"500px"}
            width={"500px"}
          />
        </Flex>
        {/* Form Section */}
        <Flex flex="1" alignItems="center" justifyContent="center" bg="#240750" p={6}>
          <Flex maxWidth="auto" minWidth={{ base: "80%", lg: "500px" }} p={10} borderRadius="md" boxShadow="lg" justifyContent={"center"} alignItems={"center"} flexDir={"column"} color={"white"} bg="white">
            <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">Employee Log In</Heading>
            <form onSubmit={handleLogin} width="100%">
              <VStack spacing={4}>
                <FormControl id="email" p={6} width={"100%"}>
                  <Input
                    type="email"
                    focusBorderColor="teal.500"
                    placeholder='Your email'
                    width={"100%"}
                    color={"black"}
                    className='input'
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  />
                </FormControl>
                <FormControl id="password" p={6} width={"100%"}>
                  <Input
                    type="password"
                    focusBorderColor="teal.500"
                    placeholder='password'
                    width={"100%"}
                    className='input'
                    color={"black"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                </FormControl>
                <Button colorScheme="teal" p={6} type="submit" mt={4} width={"100%"}>Log In</Button>
                <Link to="/employee/register"><Text color={"green"}>Create a new account | Register</Text></Link>
              </VStack>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
