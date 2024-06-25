import React, { useState } from 'react';
import { Box, Flex, Image, FormControl, Input, Button, Heading, VStack,Text } from '@chakra-ui/react';
import image from "../assets/ticket_tool_img.png";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { register } from '../features/auth/authActions';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);

  const navigation=useNavigate();


  if(isAuthenticated && userRole=="user")
    {
      navigation("/home")
    }


  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    // Dispatch the register action with the form data
    dispatch(register(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Flex minHeight="100vh" width="100vw" className='mainContainer' backgroundColor={"white"} color="black">
      <Flex flex={1} minHeight="100%" width="100%" flexDirection={{ base: "column", lg: "row" }}>
  
      {/* Image Section */}
      <Flex flex="1"  display={{ base: "none", lg: "flex" }}  width="100%" height={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Image
          src={image} 
          alt="Sample Image"
          objectFit="cover"
          maxHeight={"500px"}
          width={"500px"}
        />
      </Flex>

  
      <Flex flex="1" alignItems="center" justifyContent="center" bg="#EEEEEE" p={6} >
      <Flex maxWidth="auto" minWidth={{ base: "80%", lg: "500px" }} p={10} borderRadius="md" boxShadow="lg" justifyContent={"center"} alignItems={"center"} flexDir={"column"} color={"white"} bg="white">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">Register</Heading>
            <form onSubmit={handleRegister} minWidth="100%">
              <VStack spacing={4}>
                <FormControl id="name" p={6} width={"100%"}>
                  <Input 
                    type="text" 
                    name="username" 
                    value={formData.name} 
                    onChange={handleChange} 
                    focusBorderColor="teal.500"  
                    placeholder='Your Name' 
                    color={"black"}
                    width={"100%"} 
                    className='input'
                 
                  />
                </FormControl>
                <FormControl id="email" p={6} width={"100%"}>
                  <Input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    focusBorderColor="teal.500"  
                    placeholder='Your email' 
                    width={"100%"} 
                    color={"black"}
                    className='input'
                  />
                </FormControl>
                <FormControl id="password" p={6} width={"100%"}>
                  <Input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    focusBorderColor="teal.500"  
                    placeholder='password' 
                    width={"100%"} 
                    color={"black"}
                    className='input'
                  />
                </FormControl>

                <Button colorScheme="teal" p={6} type="submit" mt={4} width={"100%"}>Register</Button>

                <Link to="/login"><Text color="green">Alredy have account ? | Log In </Text></Link>
              </VStack>
            </form>
          </Flex>
        </Flex>
    </Flex>
  </Flex>
  );
}
