import React ,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';
import io from 'socket.io-client';
import {addNotification} from "../../features/notification/notificationSlice"

// Server endpoint who generate the notification
const ENDPOINT = "http://localhost:5000";

// component to manage and show notification
const NotificationList = () => {
  const dispatch=useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuth=useSelector((state)=>state.auth.isAuthenticated)
 
  
  useEffect(() => {
    const socket = io(ENDPOINT, {
      query: { token: token }
    });
   
    socket.on('notification', (notification) => {
      dispatch(addNotification(notification));
    });

    return () => socket.disconnect();
  }, [dispatch,token,isAuth]);

  const notificationList=useSelector((state)=>state.notification.notifications);
  console.log(notificationList)

  return (
    <Box>
      <Text fontSize="xl" mb={4} color={"black"}>Notifications</Text>
      {notificationList.length > 0 ? (
        notificationList.map((notification, index) => (
          <Box key={index} p={3} mb={2} borderWidth={1} borderRadius="md" color={"black"} bg={"lightblue"}>
            {notification.message}
          </Box>
        ))
      ) : (
 
        <Box p={3} mb={2} borderWidth={1} borderRadius="md" color={"black"}>
          No notifications available
          </Box>
      )}
    </Box>
  );
};

export default NotificationList;
