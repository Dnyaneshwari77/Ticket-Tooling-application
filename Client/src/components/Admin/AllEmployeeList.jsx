import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeList, getFilterEmployee } from "../../features/employee/employeeAction";
import { Box, Flex } from "@chakra-ui/react";
import EmployeeCard from "./EmployeeCard";
import {
  getAllDBTicketsByAdmin,
} from "../../features/ticket/ticketAction";
import AdminAvaibilityStatus from "./AdminAvaibilityStatus";
// import { fillterEmployees } from "../../features/employee/employeeSlice";

export default function AllEmployeeList() {
  let employeeList = [];
  let ticketList = [];

  employeeList = useSelector((state) => state.employee.employeeList);
  ticketList = useSelector((state) => state.ticket.currrentUserTicket);

  const dispatch = useDispatch();

  const loadEmployeeList = () => {
    dispatch(getAllEmployeeList());
    dispatch(getAllDBTicketsByAdmin());
  };

  const loadFillterEmployee=()=>
    {
      dispatch(getFilterEmployee({status:"all"}));
    }

    const fillterEmployees=useSelector(state=>state.employee.filterEmployee);
  useEffect(() => {
    loadFillterEmployee
    loadEmployeeList();
  }, []);

  return (
    <Box width={"100%"}>
    <AdminAvaibilityStatus/>
    <Flex justifyContent={"center"} gap={"20px"} flexWrap={"wrap"}>
      {fillterEmployees &&
        fillterEmployees.map((employee) => {
          return <EmployeeCard emp={employee} />;
        })}
    </Flex>
    </Box>
    
  );
}
