import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import CreateCar from "./CreateCar";
import DisplayCars from "./DisplayCars";

export default function SelectCar() {
  const [creatingCar, setCreatingCar] = useState(false);
  const [clientCars, setClientCars] = useState([]);
  const { getCarsFromClient, clientSelected } = useData();
  useEffect(() => {
    const fetchData = async () => {
      await getCarsFromClient(clientSelected.id).then((res) => {
        if (res.status == 200) {
          setClientCars(res.message);
        }
      });
    };

    fetchData();
  }, []);
  return (
    <Card>
      <Card.Header>
        <h2 className="text-center">Voiture</h2>
      </Card.Header>
      <Card.Body>
        <DisplayCars cars={clientCars} />

        {!creatingCar && (
          <Button className="w-100 mt-2" onClick={() => setCreatingCar(true)}>
            Nouvelle voiture
          </Button>
        )}

        {creatingCar && <CreateCar />}
      </Card.Body>
    </Card>
  );
}
