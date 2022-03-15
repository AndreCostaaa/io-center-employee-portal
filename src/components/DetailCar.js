import React, { useState } from "react";
import { Button, Card, Table, Image } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailCar() {
  const { getAllData, id } = useData();
  const [data, setData] = useState(getAllData()[id - 1]);
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
                  <h5>{data.brand + " " + data.model}</h5>
                  <h6>{data.licensePlate}</h6>
                </td>
                <td>
                  <h6 className="mt-2">{data.releaseDate}</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>
                    {"No Chassis:"} <br />
                    {data.chassisNo}
                  </h6>
                </td>
                <td>
                  <h6>
                    {"Recéption par type:"} <br />
                    {data.receptionType}
                  </h6>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button className="w-100">Modifier</Button>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
