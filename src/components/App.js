import AuthProvider from "contexts/AuthContext.js";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.js";

function App() {
  return (
    <Container
      className=" d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="w=100" style={{ maxWidth: "600px" }}>
        <h1>IO Center Employee Portal</h1>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
