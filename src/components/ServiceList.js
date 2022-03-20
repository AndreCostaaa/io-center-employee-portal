import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";
import Service from "./Service";
export default function DetailClient() {
  const { carSelected, getServicesDone } = useData();
  const [servicesArr, setServicesArr] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getServicesDone(carSelected.id).then((res) => {
        console.log(res);
        if (res.status == 200) {
          setServicesArr(res.message);
        }
      });
    };

    fetchData();
  }, []);
  return (
    <Card>
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Liste de Services</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          {servicesArr.length > 0 &&
            servicesArr.map((element, idx, length) => {
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
