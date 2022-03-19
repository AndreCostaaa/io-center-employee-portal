import AuthProvider from "contexts/AuthContext.js";
import DataProvider from "contexts/DataContext.js";
import React from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import CreateCar from "./CreateCar.js";
import CreateClient from "./CreateClient.js";
import CreateService from "./CreateService.js";
import Dashboard from "./Dashboard.js";
import Details from "./Details.js";
import Login from "./Login.js";
import Search from "./Search.js";
import SearchResults from "./SearchResults.js";

function App() {
  return (
    <Container
      className=" d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w=100" style={{}}>
        <h1 className="mb-5">IO Center Employee Portal</h1>
        <Router>
          <AuthProvider>
            <DataProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-client" element={<CreateClient />} />
                <Route path="/create-car" element={<CreateCar />} />
                <Route path="/create-service" element={<CreateService />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/detail-page" element={<Details />} />{" "}
              </Routes>
            </DataProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
