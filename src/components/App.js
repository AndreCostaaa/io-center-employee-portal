import AuthProvider from "contexts/AuthContext.js";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCar from "./CreateCar.js";
import CreateClient from "./CreateClient.js";
import CreateService from "./CreateService.js";
import Dashboard from "./Dashboard.js";
import Login from "./Login.js";
import Search from "./Search.js";

function App() {
  return (
    <Container
      className=" d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="w=100" style={{ maxWidth: "600px" }}>
        <h1 className="mb-5">IO Center Employee Portal</h1>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-client" element={<CreateClient />} />
              <Route path="/create-car" element={<CreateCar />} />
              <Route path="/create-service" element={<CreateService />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
