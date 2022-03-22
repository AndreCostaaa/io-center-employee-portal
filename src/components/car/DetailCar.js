import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailCar() {
  const { carSelected, setCarSelected } = useData();
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
                  <h5>
                    {carSelected.brand.toUpperCase() +
                      " " +
                      carSelected.model.toUpperCase()}
                  </h5>
                  <h6>{carSelected.license_plate.toUpperCase()}</h6>
                </td>
                <td>
                  <h6 className="mt-2">
                    {carSelected.release_date &&
                      carSelected.release_date.split(" ")[0]}
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>
                    {"No Chassis:"} <br />
                    {carSelected.chassis_no.toUpperCase()}
                  </h6>
                </td>
                <td>
                  <h6>
                    {"Recéption par type:"} <br />
                    {carSelected.reception_type.toUpperCase()}
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
