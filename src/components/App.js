import AuthProvider from "contexts/AuthContext.js";
import DataProvider from "contexts/DataContext.js";
import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./main-pages/Dashboard.js";
import MainPage from "./main-pages/MainPage.js";
import Login from "./main-pages/Login.js";
import AdminPortal from "./main-pages/AdminPortal.js";
import ToolDashboard from "./tool/ToolDashboard.js";
import logo from "../media/logo.png";
import UserDashboard from "./user/UserDashboard.js";
import ChangePassword from "./user/ChangePassword.js";
import ServiceTypeDashboard from "./service-type/ServiceTypeDashboard.js";

import { useAuth } from "../contexts/AuthContext";
function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
      }}
      className="text-black"
    >
      <Navbar collapseOnSelect expand="lg" bg="#ff0000">
        <Container>
          <a href="/dashboard">
            <img src={logo} alt="Couldn't find logo"></img>
          </a>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="w-75"></Nav>
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        className="d-flex justify-content-center"
        style={{ maxWidth: "90vh" }}
      >
        <Router>
          <AuthProvider>
            <DataProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new" element={<MainPage />} />
                <Route path="/admin-portal" element={<AdminPortal />} />
                <Route path="/tool" element={<ToolDashboard />} />
                <Route
                  path="/service-type"
                  element={<ServiceTypeDashboard />}
                />
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/change-password" element={<ChangePassword />} />
              </Routes>
            </DataProvider>
          </AuthProvider>
        </Router>
      </Container>
    </div>
  );
}

export default App;
