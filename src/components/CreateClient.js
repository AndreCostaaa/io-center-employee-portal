import React, { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateClient() {
  const prenomRef = useRef();
  const nomRef = useRef();
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Formulaire Nouveau Client</h2>
          <Form>
            <Form.Group>
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" ref={prenomRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" ref={nomRef}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>NPA</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Localité</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Button
              onClick={() => {
                navigate("/create-car");
              }}
              className="w-100 mt-3"
              type="submit"
            >
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
