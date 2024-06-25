import { createSlice, current } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    currrentUserTicket: [],
    filterTickets: [],
    filterEmployee:[],
    loading: false,
    error: null,
    pending: [],
    assignTicket: [],
  },
  reducers: {
    ticketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    currentTicketRequest: (state, action) => {
      state.currrentUserTicket = action.payload;
      state.loading = false;
    },
    fillterTickets: (state, action) => {
      state.filterTickets = action.payload;
      state.loading = false;
    },
    currentPendingRequest: (state, action) => {
      state.pending = action.payload;
      state.loading = false;
    },
    changeStatusOfTicket: (state, action) => {
      const updatedTicket = action.payload;
      const ticketIndex = state.currrentUserTicket.findIndex(
        (ticket) => ticket._id === updatedTicket._id
      );
      console.log(ticketIndex);
      if (ticketIndex !== -1) {
        state.currrentUserTicket[ticketIndex] = updatedTicket;
      }
    },

    currentAssignTicketRequest: (state, action) => {
      state.loading = false;
      state.assignTicket = action.payload;
    },
    ticketSuccess: (state, action) => {
      state.loading = false;
      state.tickets.push(action.payload);
    },
    ticketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  ticketRequest,
  ticketSuccess,
  ticketFailure,
  fillterTickets,
  filterEmployee,
  currentTicketRequest,
  currentPendingRequest,
  currentAssignTicketRequest,
  changeStatusOfTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;
