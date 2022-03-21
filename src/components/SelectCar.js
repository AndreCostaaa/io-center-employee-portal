import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useData } from "contexts/DataContext";
import CarInformation from "./CarInformation";
import CreateCar from "./CreateCar";
export default function SelectCar() {
  const prenomRef = useRef();
  const nomRef = useRef();
  const registrationRef = useRef();
  const [clientCarsArr, setClientCarsArr] = useState([]);
  const [carHovered, setCarHovered] = useState();
  const [creatingCar, setCreatingCar] = useState(false);
  const navigate = useNavigate();
  const { createCar, clientSelected, getCarsFromClient, setCarSelected } =
    useData();
  useEffect(() => {
    const fetchData = async () => {
      await getCarsFromClient(clientSelected.id).then((res) => {
        console.log(res);
        if (res.status == 200) {
          setClientCarsArr(res.message);
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
          <Table className="text-center">
            <thead>
              <tr>
                <th>
                  Marque
                  <br /> Modèle
                </th>
                <th>Plaque</th>
                <th>
                  No de <br /> chassis
                </th>
                <th>
                  Reception par <br />
                  type
                </th>
              </tr>
            </thead>
            <tbody>
              {clientCarsArr.length > 0 &&
                clientCarsArr.map((car, idx) => (
                  <CarInformation
                    key={idx}
                    car={car}
                    callback={setCarHovered}
                    hovered={carHovered && carHovered.id === car.id}
                  />
                ))}
            </tbody>
          </Table>
          {carHovered && carHovered.id > 0 ? (
            <Button
              className="w-100"
              onClick={() => setCarSelected(carHovered)}
            >
              Selectionner
            </Button>
          ) : (
            ""
          )}
          {!creatingCar && (
            <Button className="w-100 mt-2" onClick={() => setCreatingCar(true)}>
              Nouvelle voiture
            </Button>
          )}
          {creatingCar && <CreateCar />}
        </Card.Body>
      </Card>
    </>
  );
}
