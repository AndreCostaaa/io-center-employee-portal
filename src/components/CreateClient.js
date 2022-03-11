import React, { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function CreateClient() {
  const prenomRef = useRef();
  const nomRef = useRef();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Formulaire</h2>
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
            <Button onClick={() => {}} className="w-100 mt-3" type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
