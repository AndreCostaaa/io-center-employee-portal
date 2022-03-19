import { useData } from "contexts/DataContext";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
export default function CreateClient() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [npa, setNpa] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState(0);
  const inputRefArr = useRef([]);

  const navigate = useNavigate();
  const { createClient } = useData();
  function addToRefs(element) {
    if (element && !inputRefArr.current.includes(element)) {
      inputRefArr.current.push(element);
    }
  }
  useEffect(() => {}, []);
  function handleRequiredValues() {
    for (let i in inputRefArr.current) {
      if (!inputRefArr.current[i].value) {
        inputRefArr.current[i].focus();
        return false;
      }
    }
    return true;
  }
  async function handleCreate(e) {
    e.preventDefault();
    if (state == 0) {
      setState(1);
      return;
    }

    if (!handleRequiredValues()) {
      return;
    }
    if (
      await createClient(name, lastName, address, city, npa, email, phoneNumber)
    ) {
    }
  }
  async function handleSearch(e) {
    e.preventDefault();
    if (state == 0) {
      setState(2);
      return;
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Formulaire Client</h2>{" "}
          <BsFillArrowLeftSquareFill />
          {state != 0 && (
            <Form>
              <Form.Group>
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  ref={addToRefs}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  ref={addToRefs}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  ref={addToRefs}
                ></Form.Control>
              </Form.Group>
              <Row>
                <div className="w-75">
                  <Form.Group as={Col}>
                    <Form.Label>Localité</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setCity(e.target.value)}
                      ref={addToRefs}
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
                    ref={addToRefs}
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
            </Form>
          )}
          {state != 2 && (
            <Button className="w-100 mt-3" onClick={handleCreate}>
              Nouveau Client
            </Button>
          )}
          {state != 1 && (
            <Button className="w-100 mt-3" onClick={handleSearch}>
              Client Existant
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
