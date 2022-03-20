import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailClient() {
  const { clientSelected, setClientSelected, setCarSelected } = useData();
  const [visible, setVisible] = useState(true);
  return (
    <Card>
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Client</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          <Table className="text-center">
            <tbody>
              <tr>
                <td>
                  <h5>
                    {clientSelected.name + " " + clientSelected.last_name}
                  </h5>
                </td>
                <td>
                  <h6 className="mt-1">{clientSelected.mobile}</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>
                    {clientSelected.address}
                    <br />
                    {clientSelected.city + " " + clientSelected.npa}
                  </h6>
                </td>
                <td>
                  <h6>{clientSelected.email}</h6>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="gx-1">
            <Button className="w-100 border">Modifier ce Client</Button>
            <Button
              className="w-100 mt-3 border"
              onClick={() => {
                setClientSelected(null);
                setCarSelected(null);
              }}
            >
              Selectionner un autre Client
            </Button>
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
