import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";
import Service from "./Service";
export default function DetailClient() {
  const { getAllData, id } = useData();
  const [data, setData] = useState(getAllData()[id - 1]);
  const [visible, setVisible] = useState(true);

  return (
    <Card>
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Liste de Services</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          {data.servicesList.map((element, idx, length) => {
            return (
              <div key={idx} className="mt-2">
                <hr />
                <hr />
                <Service props={element} />
              </div>
            );
          })}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
