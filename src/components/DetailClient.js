import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailClient() {
  const { getAllData, id } = useData();
  const [data, setData] = useState(getAllData()[id - 1]);
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
                  <h5>{data.name + " " + data.lastName}</h5>
                </td>
                <td>
                  <h6 className="mt-1">{data.mobile}</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>
                    {data.address}
                    <br />
                    {data.city + " " + data.npa}
                  </h6>
                </td>
                <td>
                  <h6>{data.email}</h6>
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
