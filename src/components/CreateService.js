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
  const prenomRef = useRef();
  const nomRef = useRef();
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
        <Card.Body>
          <h2 className="text-center mb-4">Service</h2>
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
          <h2 className="text-center mt-5">{service}</h2>
          {service === "Optimisation" ? (
            <DropdownButton
              drop="end"
              className="text-center mt-5 mb-5"
              title="Machine utilisé"
            >
              {machineList.map((machine) => (
                <Dropdown.Item onClick={() => setMachine(machine)}>
                  {machine}
                </Dropdown.Item>
              ))}
            </DropdownButton>
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
