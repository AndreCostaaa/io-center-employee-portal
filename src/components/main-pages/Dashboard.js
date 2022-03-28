import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { getCurrentUser, logout, verifyStoredToken } = useAuth();
  const user = getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await verifyStoredToken().then((res) => {
        if (res.status !== 200) {
          navigate("/login");
        }
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>{" "}
          <h3 className="text-center ">
            Hello {user && user.name.split(" ")[0]}
          </h3>
          <Button
            onClick={() => navigate("/new")}
            className="w-100 mt-2 border"
          >
            Nouveau
          </Button>
          <Button
            onClick={() => navigate("/search")}
            className="w-100 mt-2 border"
          >
            Rechercher Voiture
          </Button>
          {user.role === "admin" ? (
            <Button
              onClick={() => navigate("/admin-portal")}
              className="w-100 mt-2 border"
            >
              Portal Admin
            </Button>
          ) : (
            ""
          )}
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-100 mt-5 border"
            as={Col}
          >
            Logout
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
