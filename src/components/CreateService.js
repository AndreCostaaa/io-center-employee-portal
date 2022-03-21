import React, { useEffect, useRef, useState } from "react";
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
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [machine, setMachine] = useState("");
  const [loading, setLoading] = useState(true);
  const [servicesList, setServicesList] = useState([]);
  const [machineList, setMachineList] = useState([]);

  useEffect(() => {
    setServicesList(["Service", "Installation", "Réparation", "Optimisation"]);
    setMachineList(["v2", "v3"]);
    setLoading(false);
  }, []);
  return loading ? (
    <h1> Loading </h1>
  ) : (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-center">Nouveau Service</h2>
        </Card.Header>
        <Card.Body>
          <DropdownButton
            drop="end"
            className="text-center"
            title="Type de Service"
          >
            {servicesList.map((service, i) => (
              <Dropdown.Item key={i} onClick={() => setService(service)}>
                {service}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <h4 className="text-center mt-2">{"Type de Service: " + service}</h4>
          {service === "Optimisation" ? (
            <>
              <DropdownButton
                drop="end"
                className="text-center mt-1 mb-1"
                title="Machine utilisée"
              >
                {machineList.map((machine) => (
                  <Dropdown.Item onClick={() => setMachine(machine)}>
                    {machine}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <h4 className="text-center mt-2">
                {"Machine utilisée: " + machine}
              </h4>
            </>
          ) : (
            ""
          )}
          {service ? (
            <Form>
              <Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Descriptif</Form.Label>
                  <Form.Control
                    className="w-100"
                    as="textarea"
                    rows={3}
                  ></Form.Control>
                </Form.Group>

                <Form.Label>Km</Form.Label>
                <Form.Control
                  className="w-100"
                  type="number"
                  min="0"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Photos</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
              <Button
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="w-100 mt-3"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
}
