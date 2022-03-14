import { useData } from "contexts/DataContext";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";

export default function Details() {
  const { getAllData, id } = useData();
  const [data, setData] = useState(getAllData()[id - 1]);
  return (
    <>
      <Card>
        <Card.Body>
          <Table borderless="true" className="text-center">
            <tbody>
              <tr>
                <td>
                  <h5>{data.name + " " + data.lastName}</h5>
                </td>
                <td>
                  <h5>{data.brand + " " + data.model}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  {data.mobile}
                  <br /> {data.email}
                </td>
                <td>{data.licensePlate}</td>
              </tr>
              <tr>
                <td>
                  {data.address} <br /> {data.city + " " + data.npa}
                </td>
                <td>{"No Chassis: " + data.lastName}</td>
              </tr>
              <tr>
                <td>
                  {data.address} <br /> {data.city + " " + data.npa}
                </td>
                <td>{"No Chassis: " + data.lastName}</td>
              </tr>
            </tbody>
          </Table>
          <Button className="w-100" as={Col}>
            Modifier
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
