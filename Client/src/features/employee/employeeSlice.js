import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeList: [],
    notAssigTicket: [],
    filterEmployee: [],
    loading: false,
    error: null,
  },
  reducers: {
    employeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    employeeListRequest: (state, action) => {
      state.employeeList = action.payload;
      state.loading = false;
    },
    fillterEmployees: (state, action) => {
      state.filterEmployee = action.payload;
      state.loading = false;
    },
    employeeSuccess: (state, action) => {
      state.loading = false;
    },
    employeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    
  },
});

export const {
  employeeRequest,
  employeeListRequest,
  employeeSuccess,
  employeeFailure,
  fillterEmployees,

} = employeeSlice.actions;
export default employeeSlice.reducer;
