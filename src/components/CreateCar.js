import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useData } from "contexts/DataContext";
export default function CreateCar() {
  const registrationPictureRef = useRef();
  const picturesRef = useRef();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [date, setDate] = useState();
  const [chassisNo, setChassisNo] = useState();
  const [licensePlate, setLicensePlate] = useState();
  const [receptionType, setReceptionType] = useState();
  const navigate = useNavigate();
  const { clientSelected, getCarsFromClient, createCar } = useData();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCarsFromClient(clientSelected.id);
    };

    fetchData();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    let carte_grise = registrationPictureRef.current.files[0];
    let pictures = picturesRef.current.files;
    console.log(pictures);
    var fd = new FormData();
    fd.append("brand", brand);
    fd.append("model", model);
    fd.append("date", date);
    fd.append("license_plate", licensePlate);
    fd.append("chassis_no", chassisNo);
    fd.append("reception_type", receptionType);
    fd.append("car_registration_photo", carte_grise);
    fd.append("pictures", pictures);
    fd.append("owner_id", clientSelected.id);
    await createCar(fd);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Formulaire Nouvelle Voiture</h2>
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
            <Form.Group>
              <Form.Label>Première Mise en Circulation</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Carte Grise</Form.Label>
              <Form.Control ref={registrationPictureRef} type="file" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Photos</Form.Label>
              <Form.Control ref={picturesRef} type="file" multiple />
            </Form.Group>
            <Button
              onClick={
                //navigate("/create-service");
                //axios.post;
                handleSubmit
              }
              className="w-100 mt-3"
              //type="submit"
            >
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
