import React, { useContext, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    /*
    if (!currentUser) {
      navigate("/login");
    }*/
  });

  function onClick(e) {
    e.preventDefault();
    console.log("Hello");
  }
  return (
    <>
      <h1>Hello {currentUser && currentUser.username}</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard </h2>
          <Form>
            <Button
              onClick={() => navigate("/create-client")}
              className="w-100 mt-2  float-right"
              type="submit"
            >
              Nouveau Client
            </Button>
            <Button
              onClick={() => navigate("/create-car")}
              className="w-100 mt-2 float-right"
              type="submit"
            >
              Nouvelle Voiture
            </Button>
            <Button
              onClick={() => navigate("/create-service")}
              className="w-100 mt-2 float-right"
              type="submit"
            >
              Nouveau Service
            </Button>
            <Button onClick={onClick} className="w-100 mt-2" type="submit">
              Rechercher
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
