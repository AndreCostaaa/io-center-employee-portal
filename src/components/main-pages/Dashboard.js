import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { getCurrentUser, logout, verifyStoredToken } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await verifyStoredToken().then((res) => {
        if (res.status !== 200) {
          navigate("/login");
        }
      });
    };
    setUser(getCurrentUser());
    if (user == "null") {
      navigate("/login");
    }
    fetchData();
  }, []);

  return (
    <>
      {user ? (
        <Card>
          <Card.Header>
            <h2 className="text-center">Dashboard</h2>
          </Card.Header>
          <Card.Body>
            <h3 className="text-center ">
              Hello {user && user.name.split(" ")[0]}
            </h3>
            <Button
              onClick={() => navigate("/new")}
              className="w-100 mt-2 border"
            >
              Démarrer
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
      ) : (
        "Authenticating"
      )}
    </>
  );
}
