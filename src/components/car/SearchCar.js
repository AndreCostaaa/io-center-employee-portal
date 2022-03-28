import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import DisplaySearchResults from "../search/SearchResults";
import { useData } from "contexts/DataContext";
import DisplayCars from "./DisplayCars";

export default function SearchCar() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [date, setDate] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [receptionType, setReceptionType] = useState("");
  const [carsToDisplay, setCarsToDisplay] = useState();
  const [carsList, setCarsList] = useState();
  const { getAllCars } = useData();
  useEffect(() => {
    const fetchData = async () => {
      await getAllCars().then((res) => {
        if (res.status === 200) {
          setCarsToDisplay(res.message);
        }
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-center">Voiture</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setModel(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col}>
              <Form.Label>Plaque</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLicensePlate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Numero de Chassis</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setChassisNo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Reception par Type</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setReceptionType(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card className="mt-2">
          <Card.Header>
            <h2 className="text-center">Liste de Voitures</h2>
          </Card.Header>
          <Card.Body>
            <DisplayCars cars={carsToDisplay} />
          </Card.Body>
        </Card>
      </Card>
    </>
  );
}
