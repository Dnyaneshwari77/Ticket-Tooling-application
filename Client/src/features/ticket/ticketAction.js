import {
  ticketRequest,
  ticketSuccess,
  ticketFailure,
  currentTicketRequest,
  currentPendingRequest,
  fillterTickets,
  changeStatusOfTicket,
  filterEmployee,
} from "./ticketSlice";
import axios from "axios";

// Generate Ticket only Client have acess to this
export const ticketGenerate = (ticketData) => {
  return async (dispatch, getState) => {
    dispatch(ticketRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.post(
        " http://localhost:5000/api/v1/tickets/create",
        ticketData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      dispatch(ticketSuccess(response.data.ticket._id));
    } catch (error) {
      dispatch(
        ticketFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Get all client tickets only work for client
export const getAllTickets = () => {
  return async (dispatch, getState) => {
    dispatch(ticketRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.get(
        " http://localhost:5000/api/v1/tickets/yourTickets/",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.tickets) {
        dispatch(currentTicketRequest(response.data.tickets));
      } else {
        dispatch(currentTicketRequest([]));
      }
    } catch (error) {
      dispatch(
        ticketFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

//  Get all ticket for Admin only admin have acess to this
export const getAllDBTicketsByAdmin = () => {
  return async (dispatch, getState) => {
    dispatch(ticketRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.get(
        " http://localhost:5000/api/v1/tickets/",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.tickets) {
        dispatch(currentTicketRequest(response.data.tickets));
      } else {
        dispatch(currentTicketRequest([]));
      }
    } catch (error) {
      dispatch(
        ticketFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Get all tickets that is assigned to particular employee
export const getAllTicketsOfEmployee = () => {
  return async (dispatch, getState) => {
    dispatch(ticketRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/employees/yourtickes",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(response.data.tickes);
      if (response.data.tickets) {
        dispatch(currentTicketRequest(response.data.tickets));
      } else {
        dispatch(currentTicketRequest([]));
      }
    } catch (error) {
      dispatch(
        ticketFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Chnage the status of the ticket only by employee to whome this ticket is assigned
export const changeStatusByEmployee = ({ id, Status }) => {
  return async (dispatch, getState) => {
    dispatch(ticketRequest());

    const payload = { ticket_id: id, status: Status };

    const { token } = getState().auth;

    try {
      const response = await axios.post(
        " http://localhost:5000/api/v1/employees/yourtickes/",
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      dispatch(changeStatusOfTicket(response.data.ticket));
    } catch (error) {
      dispatch(
        ticketFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Get the pending ticket which are remain to assigned only accessed by admin to assign pending tickets to employee
export const getPendingTickets = () => {
  return async (dispatch, getState) => {
    dispatch(ticketRequest());

    const { token } = getState().auth;

    try {
      const response = await axios.get(
        " http://localhost:5000/api/v1/tickets/pending",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.tickets) {
        dispatch(currentPendingRequest(response.data.tickets));
      } else {
        dispatch(currentPendingRequest([]));
      }
    } catch (error) {
      dispatch(
        ticketFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// export const getFilterTickets = ({ status, sortByDate }) => (dispatch, getState) => {
//   dispatch(ticketRequest(true));

//   const state = getState();
//   const allTickets = state.ticket.currrentUserTicket;

//   let filtered = allTickets;

//   if (status) {
//     filtered = filtered.filter(ticket => ticket.Status.toLowerCase() === status.toLowerCase());
//   }

//   // Sort by date if sortByDate is provided
//   if (sortByDate !== undefined) {
//     filtered = filtered.sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);

//       if (sortByDate) {

//         return dateA - dateB;
//       } else {

//         return dateB - dateA;
//       }
//     });
//   }

//   dispatch(fillterTickets(filtered));

// };

export const getFilterTickets =
  ({ status, sortByDate }) =>
  (dispatch, getState) => {
    dispatch(ticketRequest(true));

    const state = getState();
    const currentUserTickets = state.ticket.currrentUserTicket.slice();
    const filterTickets = state.ticket.fillterTickets
      ? state.ticket.fillterTickets.slice()
      : [];

    // console.log("Fillter Tickets",fillterTickets);

    // console.log(status,sortByDate);

    let filtered = [];

    // Apply status filter to currentUserTicket
    if (status === "all" || status == undefined) {
      filtered = currentUserTickets;
    } else if (status) {
      filtered = currentUserTickets.filter(
        (ticket) => ticket.Status.toLowerCase() === status.toLowerCase()
      );
    } else {
      filtered = filterTickets;
    }


    dispatch(fillterTickets(filtered));
  };

