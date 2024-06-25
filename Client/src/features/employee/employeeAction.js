import {
  employeeRequest,
  employeeListRequest,
  employeeSuccess,
  employeeFailure,
  fillterEmployees,
} from "./employeeSlice";
import { changeEmployeeStatus } from "../auth/authSlice";
import axios from "axios";

//  Get All Employee List It only work if you are admin Only admin have acess to it.
export const getAllEmployeeList = () => {
  return async (dispatch, getState) => {
    dispatch(employeeRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.get(
        " http://localhost:5000/api/v1/employees/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.employees) {
        // Get all employee List and store into state
        dispatch(employeeListRequest(response.data.employees));
      } else {
        dispatch(employeeListRequest([]));
      }
    } catch (error) {
      dispatch(
        employeeFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Assign ticket to some employee only by admin have acess to it.
export const assignEmployeeTicket = (credential) => {
  console.log("ID", credential);
  return async (dispatch, getState) => {
    dispatch(employeeRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.post(
        " http://localhost:5000/api/v1/employees/assign",
        credential,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      dispatch(employeeSuccess());
    } catch (error) {
      dispatch(
        employeeFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

export const getFilterEmployee =
  ({ status }) =>
  (dispatch, getState) => {
    dispatch(employeeRequest(true));

    console.log(status);
    const state = getState();
    const currentListOfEmployee = state.employee.employeeList.slice();
    const filterEmployee = state.employee.filterEmployee
      ? state.employee.filterEmployee.slice()
      : [];

    // console.log("Fillter Tickets",fillterTickets);

    // console.log(status,sortByDate);

    let filtered = [];

    // Apply status filter to currentUserTicket
    if (status === "all" || status == undefined) {
      filtered = currentListOfEmployee;
    } else if (status) {
      filtered = currentListOfEmployee.filter(
        (employee) => employee.avaibality.toLowerCase() === status.toLowerCase()
      );
    } else {
      filtered = filterEmployee;
    }

    dispatch(fillterEmployees(filtered));
  };

export const updateEmployeeStatus = (availability) => {
  console.log(availability);
  return async (dispatch, getState) => {
    dispatch(employeeRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.post(
        " http://localhost:5000/api/v1/employees/avaiability",
        { availabilityStatus: availability },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      dispatch(changeEmployeeStatus(availability));
    } catch (error) {
      dispatch(
        employeeFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};
