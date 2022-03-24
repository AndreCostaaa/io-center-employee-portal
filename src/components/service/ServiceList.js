import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useData } from "contexts/DataContext";
import Service from "./Service";
import CreateService from "./CreateService";
export default function DetailClient() {
  const { carSelected, getServicesDone } = useData();
  const [servicesArr, setServicesArr] = useState([]);
  const [visible, setVisible] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showingHistory, setShowingHistory] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await getServicesDone(carSelected.id).then((res) => {
        if (res.status === 200) {
          setServicesArr(res.message);
        }
      });
    };
    console.log("hello");
    fetchData();
  }, []);
  return (
    <Card>
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Service</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          <Button className="w-100 mb-2" onClick={() => setCreating(!creating)}>
            {creating ? "Annuler" : "Créer Nouveau Service"}
          </Button>
          {creating && <CreateService />}
          <Button
            className="w-100 mt-2"
            onClick={() => setShowingHistory(!showingHistory)}
          >
            {showingHistory ? "Cacher Historique" : "Regarder Historique"}
          </Button>
          {showingHistory ? (
            servicesArr.length > 0 ? (
              servicesArr.map((element, idx) => {
                return (
                  <div key={idx} className="mt-2">
                    <hr />
                    <hr />
                    <Service props={element} />
                  </div>
                );
              })
            ) : (
              <h3 className="text-center">Aucun Service</h3>
            )
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
