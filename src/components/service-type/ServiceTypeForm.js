import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

export default function ServiceTypeForm({ setFetchData }) {
  const [name, setName] = useState("");
  const { createServiceType } = useData();

  async function createBtnClicked() {
    if (!name) {
      return;
    }
    let fd = new FormData();
    fd.append("name", name);
    await createServiceType(fd).then((res) => {
      if (res.status === 201) {
        setFetchData(true);
      }
    });
  }
  return (
    <Card className="bg-transparent">
      <Card.Header>
        <h2 className="text-center">Nouveau Outil</h2>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Form.Group className="w-50" as={Col}>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
          </Row>
          <Button
            variant="dark"
            className="w-100 mt-2 border"
            onClick={createBtnClicked}
          >
            Nouveau
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
