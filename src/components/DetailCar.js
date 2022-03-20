import React, { useEffect, useState } from "react";
import { Button, Card, Table, Image } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailCar() {
  const { carSelected, setCarSelected } = useData();
  const [data, setData] = useState();
  const [visible, setVisible] = useState(true);

  return (
    <Card>
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Voiture</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          <Table className="text-center">
            <tbody>
              <tr>
                <td>
                  <h5>{carSelected.brand + " " + carSelected.model}</h5>
                  <h6>{carSelected.licensePlate}</h6>
                </td>
                <td>
                  <h6 className="mt-2">{carSelected.releaseDate}</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>
                    {"No Chassis:"} <br />
                    {carSelected.chassisNo}
                  </h6>
                </td>
                <td>
                  <h6>
                    {"Recéption par type:"} <br />
                    {carSelected.receptionType}
                  </h6>
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="gx-1">
            <Button className="w-100 border">Modifier cette voiture</Button>
            <Button
              className="w-100 mt-3 border"
              onClick={() => {
                setCarSelected(null);
              }}
            >
              Selectionner une autre Voiture
            </Button>
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
