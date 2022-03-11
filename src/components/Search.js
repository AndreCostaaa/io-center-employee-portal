import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function Search() {
  return (
    <Form>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Plaque</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Row>
    </Form>
  );
}
