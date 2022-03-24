import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, logout, verifyStoredToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await verifyStoredToken().then((res) => {
        if (res.status != 200) {
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
            Hello {currentUser && currentUser.name.split(" ")[0]}
          </h3>
          <Row className="gx-2 mt-4">
            <Button
              onClick={() => navigate("/new")}
              className="w-50 mt-2 border"
              as={Col}
            >
              Nouveau
            </Button>
            <Button
              onClick={() => navigate("/search")}
              className="w-50 mt-2 border"
              as={Col}
            >
              Rechercher
            </Button>
          </Row>{" "}
          <Row className="gx-2">
            <Button
              onClick={() => navigate("/create-client")}
              className="w-50 mt-2 border"
              as={Col}
            >
              Nouveau
            </Button>
          </Row>{" "}
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
