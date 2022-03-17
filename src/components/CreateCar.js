import axios from "axios";
import React, { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateClient() {
  const prenomRef = useRef();
  const nomRef = useRef();
  const registrationRef = useRef();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    //let file = registrationRef.files[0]
    let file = registrationRef.current.files[0];
    console.log(file);
    //console.log(file.type.match("/image.*/"));

    var fd = new FormData();
    fd.append("id", 2);
    fd.append("car_registration_photo", file);
    fd.append("brand", "bmw");
    fd.append("chassis_no", "12");
    fd.append("license_plate", "fr123456");
    console.log(fd);
    await axios({
      method: "post",
      url: "/vehicle",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (res) {
        console.log(res);
        //console.log(res.data);
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
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
                <Form.Control type="text" ref={prenomRef} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Modèle</Form.Label>
                <Form.Control type="text" ref={nomRef} />
              </Form.Group>
            </Row>
            <Form.Group as={Col}>
              <Form.Label>Plaque</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Numero de Chassis</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Reception par Type</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Première Mise en Circulation</Form.Label>
              <Form.Control type="date"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Carte Grise</Form.Label>
              <Form.Control ref={registrationRef} type="file" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Photos</Form.Label>
              <Form.Control type="file" multiple />
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
