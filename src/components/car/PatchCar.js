import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useData } from "contexts/DataContext";
export default function PatchCar({ setModifyingCar }) {
  const {
    clientSelected,
    carSelected,
    patchCar,
    setCarSelected,
    getCarRegistrationImageById,
    setCarRegistrationImage,
  } = useData();

  const [modifyingRegPic, setModifyingRegPic] = useState(false);
  const registrationPictureRef = useRef();
  const [brand, setBrand] = useState(carSelected.brand);
  const [model, setModel] = useState(carSelected.model);
  const [date, setDate] = useState(
    carSelected.release_date ? carSelected.release_date.split(" ")[0] : ""
  );
  const [chassisNo, setChassisNo] = useState(carSelected.chassis_no);
  const [licensePlate, setLicensePlate] = useState(carSelected.license_plate);
  const [receptionType, setReceptionType] = useState(
    carSelected.reception_type
  );
  useEffect(() => {
    const fetchData = async () => {
      await getCarRegistrationImageById(carSelected.id).then((res) => {
        if (res.status === 200) {
          setCarRegistrationImage(res.message);
        }
      });
    };
    if (!carSelected.registrationImage) {
      fetchData();
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    var fd = new FormData();

    let carte_grise = registrationPictureRef.current.files[0];
    if (carte_grise) {
      fd.append("car_registration_photo", carte_grise);
    }

    fd.append("id", carSelected.id);
    fd.append("brand", brand);
    fd.append("model", model);
    fd.append("date", date);
    fd.append("license_plate", licensePlate);
    fd.append("chassis_no", chassisNo);
    fd.append("reception_type", receptionType);

    await patchCar(fd).then((res) => {
      if (res.status === 200) {
        setCarSelected(res.message);
        setModifyingCar(false);
      }
    });
    setModifyingCar(false);
  }
  return (
    <Card className="bg-transparent">
      <Card.Body>
        <h2 className="text-center mb-4">Formulaire Nouvelle Voiture</h2>
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Modèle</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setModel(e.target.value)}
                value={model}
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col}>
            <Form.Label>Plaque</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLicensePlate(e.target.value)}
              value={licensePlate}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Numero de Chassis</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setChassisNo(e.target.value)}
              value={chassisNo}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Reception par Type</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setReceptionType(e.target.value)}
              value={receptionType}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Première Mise en Circulation</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            ></Form.Control>
          </Form.Group>
          <div className="text-center mt-4">
            <img
              src={carSelected.registrationImage}
              max-width="700"
              height="200"
              alt="Carte grise non trouvée"
              className="align-center"
            ></img>
          </div>
          <Form.Group>
            <Form.Label>Modifier Carte Grise</Form.Label>
            <Form.Control ref={registrationPictureRef} type="file" />
          </Form.Group>

          <Button variant="dark" onClick={handleSubmit} className="w-100 mt-3">
            Modifier
          </Button>
          <Button
            variant="dark"
            onClick={() => setModifyingCar(false)}
            className="w-100 mt-1"
          >
            Annuler
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
