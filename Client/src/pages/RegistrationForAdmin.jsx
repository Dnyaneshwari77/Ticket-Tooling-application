import React, { useState, useEffect } from 'react';
import { Text, Flex, Image, FormControl, Input, Button, Heading, VStack } from '@chakra-ui/react';
import image from "../assets/ticket_tool_img.png";
import { useNavigate ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { employeeRegistration } from '../features/auth/authActions';


export default function Admin() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    department: '',
    position: '',
    role:"admin"
  });

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && userRole === "admin") {
      navigate("/admin/home");
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(employeeRegistration(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Flex minHeight="100vh" width="100vw" className='mainContainer' backgroundColor={"#240750"}>
    <Flex minHeight="100%" width="100%" flexDirection={{ base: "column", lg: "row" }}>
      {/* Image Section */}
      <Flex flex="1" bg="" display={{ base: "none", lg: "flex" }} justifyContent="center" alignItems="center">
        <Image
          src={image}
          alt="Sample Image"
          objectFit="cover"
          maxHeight="500px"
          width="500px"
        />
      </Flex>
      <Flex flex="1" alignItems="center" justifyContent="center" bg="#EEEEEE" p={6}>
          <Flex maxWidth="" minWidth={{ base: "80%", lg: "500px" }} p={10} borderRadius="md" boxShadow="lg" justifyContent="center" alignItems="center" flexDir="column" bg="white">
            <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">Employee Register</Heading>
            <form onSubmit={handleRegister} width="100%">
              <VStack spacing={4}>
                <FormControl id="username" p={6} width="100%">
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    focusBorderColor="teal.500"
                    placeholder='Username'
                    width="100%"
                    className='input'
                  />
                </FormControl>
                <FormControl id="email" p={6} width="100%">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    focusBorderColor="teal.500"
                    placeholder='Email'
                    width="100%"
                    className='input'
                  />
                </FormControl>
                <FormControl id="password" p={6} width="100%">
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    focusBorderColor="teal.500"
                    placeholder='Password'
                    width="100%"
                    className='input'
                  />
                </FormControl>
                <FormControl id="department" p={6} width="100%">
                  <Input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    focusBorderColor="teal.500"
                    placeholder='Department'
                    width="100%"
                    className='input'
                  />
                </FormControl>
                <FormControl id="position" p={6} width="100%">
                  <Input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    focusBorderColor="teal.500"
                    placeholder='Position'
                    width="100%"
                    className='input'
                  />
                </FormControl>
                <Button colorScheme="teal" p={6} type="submit" mt={4} width="100%">Register</Button>
                <Link to="/employee/login"><Text color={"green"}>Alredy have an account | Log In</Text></Link>
              </VStack>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
