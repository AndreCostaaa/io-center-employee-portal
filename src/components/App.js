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
import SelectCar from "./car/SelectCar.js";
import SelectClient from "./client/SelectClient.js";
import CreateService from "./service/CreateService.js";
import Dashboard from "./main-pages/Dashboard.js";
import MainPage from "./main-pages/MainPage.js";
import Login from "./main-pages/Login.js";
import Search from "./search/Search.js";
import SearchResults from "./search/SearchResults.js";

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
                <Route path="/create-client" element={<SelectClient />} />
                <Route path="/create-car" element={<SelectCar />} />
                <Route path="/create-service" element={<CreateService />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/new" element={<MainPage />} />{" "}
              </Routes>
            </DataProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
