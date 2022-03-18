import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateClient() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [npa, setNpa] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { createClient } = useData();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(parseInt(phoneNumber));
    if (
      await createClient(name, lastName, address, city, npa, email, phoneNumber)
    ) {
      navigate("/create-car");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Formulaire Nouveau Client</h2>
          <Form>
            <Form.Group>
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <div className="w-75">
                <Form.Group as={Col}>
                  <Form.Label>Localité</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <Form.Group className="w-25" as={Col}>
                <Form.Label>NPA</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setNpa(e.target.value);
                    }
                  }}
                  value={npa}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="w-50" as={Col}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    let val = e.target.value;
                    if (!isNaN(val)) {
                      setPhoneNumber(val);
                    }
                  }}
                  value={phoneNumber}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Button className="w-100 mt-3" onClick={handleSubmit}>
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
