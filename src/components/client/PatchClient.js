import { useData } from "contexts/DataContext";
import React, { useState, useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function PatchClient({ setModifyingClient }) {
  const { clientSelected, patchClient, setClientSelected } = useData();
  const [name, setName] = useState(clientSelected.name);
  const [lastName, setLastName] = useState(clientSelected.last_name);
  const [address, setAddress] = useState(clientSelected.address);
  const [npa, setNpa] = useState(clientSelected.npa);
  const [city, setCity] = useState(clientSelected.city);
  const [email, setEmail] = useState(clientSelected.email_address);
  const [phoneNumber, setPhoneNumber] = useState(clientSelected.phone_number);
  const inputRefArr = useRef([]);

  function addToRefs(element) {
    if (element && !inputRefArr.current.includes(element)) {
      inputRefArr.current.push(element);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    let fd = new FormData();

    fd.append("name", name);
    fd.append("last_name", lastName);
    fd.append("address", address);
    fd.append("city", city);
    fd.append("npa", npa.toString());
    fd.append("phone_number", phoneNumber.toString());
    fd.append("email_address", email);
    fd.append("id", clientSelected.id);
    await patchClient(fd).then((res) => {
      if (res.status === 200) {
        setClientSelected(res.message);
        setModifyingClient(false);
      }
    });
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
                value={name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                ref={addToRefs}
                value={lastName}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                ref={addToRefs}
                value={address}
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
                    value={city}
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
                  value={email}
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
          <Button className="w-100 mt-3" onClick={handleUpdate}>
            Modifier
          </Button>
          <Button
            onClick={() => setModifyingClient(false)}
            className="w-100 mt-1"
          >
            Annuler
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
