import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from "../features/ticket/ticketSlice"
import employeeReducer from "../features/employee/employeeSlice"
import notificationReducer from '../features/notification/notificationSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket:ticketReducer,
    employee:employeeReducer,
    notification:notificationReducer
  },
});
