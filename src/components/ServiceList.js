import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";
import Service from "./Service";
import CreateService from "./CreateService";
export default function DetailClient() {
  const { carSelected, getServicesDone } = useData();
  const [servicesArr, setServicesArr] = useState([]);
  const [visible, setVisible] = useState(true);
  const [creating, setCreating] = useState(false);
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
        <h2>Service</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          {!creating && (
            <Button className="w-100 mb-2" onClick={() => setCreating(true)}>
              Créer Nouveau Service
            </Button>
          )}
          {creating && <CreateService />}
          {creating ? (
            <Button className="w-100 mt-2">Regarder Historique</Button>
          ) : servicesArr.length > 0 ? (
            servicesArr.map((element, idx, length) => {
              return (
                <div key={idx} className="mt-2">
                  <hr />
                  <hr />
                  <Service props={element} />
                </div>
              );
            })
          ) : (
            <h3 className="text-center">Historique vide</h3>
          )}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
