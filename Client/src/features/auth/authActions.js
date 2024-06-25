import axios from "axios";
import api from "../../api";
import { loginRequest, loginSuccess, loginFailure, logout } from "./authSlice";

// Login For Client Side
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    console.log("Login Request triggerd");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        credentials
      );
      const { token, role } = response.data;

      // Calculate token expiry time (1 hour from now)
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 1);

      const tokenExpiryTimestamp = tokenExpiry.getTime();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("tokenExpiry", tokenExpiryTimestamp);

      dispatch(loginSuccess({ token, role }));
      console.log("Login Request triggerd fullfilled");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Registration for Client Side
export const register = (credentials) => {
  console.log(credentials);
  return async (dispatch) => {
    dispatch(loginRequest());
    console.log("Registert Request triggerd");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        credentials
      );
      const { token, role } = response.data;

      // Calculate token expiry time (1 hour from now)
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 1);

      const tokenExpiryTimestamp = tokenExpiry.getTime();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("tokenExpiry", tokenExpiryTimestamp);

      dispatch(loginSuccess({ token, role }));
      console.log("Login Request triggerd fullfilled");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

// Registation for Emoployee Side
export const employeeRegistration = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    console.log("Registert Request triggerd");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/employees/register",
        credentials
      );
      const { token, role, avaibality } = response.data;

      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 1);

      const tokenExpiryTimestamp = tokenExpiry.getTime();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("tokenExpiry", tokenExpiryTimestamp);

      dispatch(loginSuccess({ token, role, avaibality }));
      console.log("Login Request triggerd fullfilled");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

//  Login For employee side
export const employeeLogin = (credentials) => {
  console.log(credentials);
  return async (dispatch) => {
    dispatch(loginRequest());
    console.log("Login Request triggerd");
    try {
      const response = await axios.post(
        " http://localhost:5000/api/v1/employees/login",
        credentials
      );
      const { token, role,avaibality } = response.data;

      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 1);

      const tokenExpiryTimestamp = tokenExpiry.getTime();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("tokenExpiry", tokenExpiryTimestamp);

      dispatch(loginSuccess({ token, role,avaibality }));
      console.log("Login Request triggerd fullfilled");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
};

//  To check Wether Token expire or not not used yet
export const checkTokenExpiry = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry && new Date().getTime() > tokenExpiry) {
      dispatch(logout());
    } else if (token) {
      dispatch(loginSuccess({ token }));
    }
  };
};

// Log out functionality comman for all
export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    dispatch(logout());
  };
};
