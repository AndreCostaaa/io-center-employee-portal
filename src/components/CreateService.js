import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateClient() {
  const prenomRef = useRef();
  const nomRef = useRef();
  const navigate = useNavigate();
  const [service, setService] = useState("");
  function onClick(e) {
    e.preventDefault();
    console.log(e);
    //setService(e.current.value);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Service</h2>
          <DropdownButton
            drop="end"
            className="text-center"
            title="Type de Service"
          >
            <Dropdown.Item onClick={() => setService("Service")}>
              Service
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setService("Installation")}>
              Installation
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setService("Réparation")}>
              Réparation
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setService("Optimisation")}>
              Optimisation
            </Dropdown.Item>
          </DropdownButton>
          <h2 className="text-center mt-5">{service ? service : ""}</h2>
        </Card.Body>
      </Card>
    </>
  );
}
