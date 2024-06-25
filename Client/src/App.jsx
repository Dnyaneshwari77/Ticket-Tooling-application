import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EmployeeRegistartion from "./pages/EmployeeRegistartion";
import EmployeeHomePage from "./pages/EmployeeHomePage";
import LogInForEmployee from "./pages/LogInForEmployee";
import LoginOption from "./pages/LoginOption";
import AdminHomePage from "./pages/AdminHomePage";
import Admin from "./pages/RegistrationForAdmin";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Register />} />
            <Route path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
            <Route
              path="employee/register"
              element={<EmployeeRegistartion />}
            />
             <Route
              path="admin/register"
              element={<Admin />}
            />
            <Route path="employee/login" element={<LogInForEmployee />} />

            {isAuthenticated ? (
              userRole === "user" ? (
                <Route path="/home">
                  <Route index element={<Home />} />
                </Route>
              ) : userRole === "employee" ? (
                <>
                  <Route path="employee/home">
                    <Route index element={<EmployeeHomePage />} />
                  </Route>
                </>
              ) : userRole == "admin" ? (
                <>
                  <Route path="admin/home">
                    <Route index element={<AdminHomePage />} />
                  </Route>
                </>
              ) : (
                <Route path="*" element={<LoginOption />} />
              )
            ) : (
              <Route path="*" element={<LoginOption />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
