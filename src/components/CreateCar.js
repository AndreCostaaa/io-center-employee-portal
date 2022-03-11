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
          <h2 className="text-center mb-4">Formulaire Nouvelle Voiture</h2>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Marque</Form.Label>
                <Form.Control type="text" ref={prenomRef} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Modèle</Form.Label>
                <Form.Control type="text" ref={nomRef} />
              </Form.Group>
            </Row>
            <Form.Group as={Col}>
              <Form.Label>Plaque</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Numero de Chassis</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Reception par Type</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Première Mise en Circulation</Form.Label>
              <Form.Control type="date"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Carte Grise</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button
              onClick={() => {
                navigate("/dashboard");
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
