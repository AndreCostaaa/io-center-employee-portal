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
      <h3 className="text-center ">
        Hello {currentUser && currentUser.name.split(" ")[0] + " :)"}
      </h3>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard </h2>
          <Form>
            <Button
              onClick={() => navigate("/create-client")}
              className="w-100 mt-2  float-right"
            >
              Nouveau
            </Button>
            <Button onClick={() => navigate("/search")} className="w-100 mt-2">
              Rechercher
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
