import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import DisplaySearchResults from "../search/SearchResults";
import { useData } from "contexts/DataContext";
import DisplayCars from "./DisplayCars";

export default function SearchCar() {
  const [brandAndModel, setBrandAndModel] = useState("");
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
          setCarsList(res.message);
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!carsList) {
      return;
    }
    setCarsToDisplay(
      carsList.filter((element) => {
        if (!brandAndModel && !chassisNo && !licensePlate && !receptionType) {
          return false;
        }
        if (
          brandAndModel &&
          !element.brand.toLowerCase().includes(brandAndModel.toLowerCase()) &&
          !element.model.toLowerCase().includes(brandAndModel.toLowerCase())
        ) {
          return false;
        }
        if (
          chassisNo &&
          !element.chassisNo.toLowerCase().includes(chassisNo.toLowerCase())
        ) {
          return false;
        }
        if (
          licensePlate &&
          !element.license_plate
            .toLowerCase()
            .includes(licensePlate.toLowerCase())
        ) {
          return false;
        }
        if (
          receptionType &&
          !element.reception_type
            .toLowerCase()
            .includes(receptionType.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [brandAndModel, chassisNo, licensePlate, receptionType]);

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
                <Form.Label>Marque & Modèle</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setBrandAndModel(e.target.value)}
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
