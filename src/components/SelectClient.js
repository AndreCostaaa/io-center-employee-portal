import { useData } from "contexts/DataContext";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import ClientInformation from "./ClientInformation";

export default function SelectClient() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [npa, setNpa] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const inputRefArr = useRef([]);
  const [clients, setClients] = useState();
  const [clientsToDisplay, setClientsToDisplay] = useState();
  const [clientHovered, setClientHovered] = useState();
  const navigate = useNavigate();
  const { createClient, getAllClients, clientSelected, setClientSelected } =
    useData();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllClients()
        .then((data) => {
          if (data.status) {
            return data.message;
          }
        })
        .then((data) => setClients(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!clients) {
      return;
    }
    console.log("hello");
    setClientsToDisplay(
      clients.filter((element) => {
        if (
          !name &&
          !lastName &&
          !address &&
          !city &&
          !npa &&
          !email &&
          !phoneNumber
        ) {
          return false;
        }
        if (name && !element.name.includes(name)) {
          return false;
        }
        if (lastName && !element.last_name.includes(lastName)) {
          return false;
        }
        if (address && !element.address.includes(address)) {
          return false;
        }
        if (city && !element.city.includes(city)) {
          return false;
        }
        if (npa && !element.npa.includes(npa)) {
          return false;
        }
        if (email && !element.email.includes(email)) {
          return false;
        }
        if (phoneNumber && !element.phone_number.includes(phoneNumber)) {
          return false;
        }
        return true;
      })
    );
  }, [clients, name, lastName, address, city, npa, email, phoneNumber]);

  function addToRefs(element) {
    if (element && !inputRefArr.current.includes(element)) {
      inputRefArr.current.push(element);
    }
  }
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

    if (!handleRequiredValues()) {
      return;
    }
    if (
      await createClient(name, lastName, address, city, npa, email, phoneNumber)
    ) {
    }
  }
  function handleSelected(e) {
    e.preventDefault();
    setClientSelected(clientHovered);
  }
  return (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-center">Client</h2>
        </Card.Header>
        <Card.Body>
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
          <Button className="w-100 mt-3" onClick={handleCreate}>
            Nouveau Client
          </Button>
        </Card.Body>
      </Card>
      {!clientSelected && (
        <Card className="mt-2">
          <Card.Header>
            <h2 className="text-center">Clients Existants</h2>
          </Card.Header>
          <Card.Body>
            <Table className="text-center">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>E-mail</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {clientsToDisplay &&
                  clientsToDisplay.map((client, idx) => (
                    <ClientInformation
                      key={idx}
                      client={client}
                      callback={setClientHovered}
                      hovered={clientHovered && clientHovered.id === client.id}
                    />
                  ))}
              </tbody>
            </Table>
            {clientHovered && (
              <Button className="w-100 mt-3" onClick={handleSelected}>
                Selectionner
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
