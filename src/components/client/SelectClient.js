import { useData } from "contexts/DataContext";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import ClientInformation from "./ClientInformation";
import CarInformation from "components/car/CarInformation";
import ClientSearchResults from "./ClientSearchResult";

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
  const { createClient, getAllClients, clientSelected } = useData();

  useEffect(() => {
    const fetchData = async () => {
      await getAllClients().then((res) => {
        console.log(res);
        if (res.status === 200) {
          setClients(res.message);
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!clients) {
      return;
    }
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
        if (name && !element.name.toLowerCase().includes(name.toLowerCase())) {
          return false;
        }
        if (
          lastName &&
          !element.last_name.toLowerCase().includes(lastName.toLowerCase())
        ) {
          return false;
        }
        if (
          address &&
          !element.address.toLowerCase().includes(address.toLowerCase())
        ) {
          return false;
        }
        if (city && !element.city.toLowerCase().includes(city.toLowerCase())) {
          return false;
        }
        if (npa && !element.npa.toLowerCase().includes(npa.toLowerCase())) {
          return false;
        }
        if (
          email &&
          !element.email_address.toLowerCase().includes(email.toLowerCase())
        ) {
          return false;
        }
        if (
          phoneNumber &&
          !element.phone_number
            .toLowerCase()
            .includes(phoneNumber.toLowerCase())
        ) {
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

    let fd = new FormData();

    fd.append("name", name);
    fd.append("last_name", lastName);
    fd.append("address", address);
    fd.append("city", city);
    fd.append("npa", npa.toString());
    fd.append("phone_number", phoneNumber.toString());
    fd.append("email_address", email);
    await createClient(fd);
  }
  return (
    <>
      <ClientSearchResults clientsToDisplay={clientsToDisplay} />

      <Card className="mt-2 bg-transparent">
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
              <Form.Group className="w-75" as={Col}>
                <Form.Label>Localité</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
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
          <Button variant="dark" className="w-100 mt-3" onClick={handleCreate}>
            Nouveau Client
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
