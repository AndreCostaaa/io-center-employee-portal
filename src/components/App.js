import AuthProvider from "contexts/AuthContext.js";
import DataProvider from "contexts/DataContext.js";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./main-pages/Dashboard.js";
import MainPage from "./main-pages/MainPage.js";
import Login from "./main-pages/Login.js";
import AdminPortal from "./main-pages/AdminPortal.js";
import ToolDashboard from "./tool/ToolDashboard.js";
function App() {
  return (
    <Container
      className=" d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w=100">
        <a href="/dashboard" className="text-decoration-none">
          <h1 className="mb-5">IO Center Employee Portal</h1>
        </a>
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
              </Routes>
            </DataProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
