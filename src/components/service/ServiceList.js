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

  const fetchServicesData = async () => {
    await getServicesDone(carSelected.id).then((response) => {
      if (response.status === 200) {
        setServicesArr(response.message);
      }
    });
  };
  useEffect(() => {
    fetchServicesData();
  }, []);
  return (
    <Card>
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Service</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          <Button
            className="w-100"
            onClick={() => {
              setCreating(!creating);
            }}
          >
            {creating ? "Annuler" : "Créer Nouveau Service"}
          </Button>
          {creating && <CreateService setCreating={setCreating} />}
          <Button
            className="w-100 mt-2"
            onClick={() => setShowingHistory(!showingHistory)}
          >
            {showingHistory ? "Cacher Historique" : "Regarder Historique"}
          </Button>
          {showingHistory && (
            <Button
              className="mt-2 w-100 text-center"
              onClick={fetchServicesData}
            >
              Refresh
            </Button>
          )}
          {showingHistory ? (
            servicesArr.length > 0 ? (
              servicesArr
                .slice(0)
                .reverse()
                .map((element, idx) => {
                  return (
                    <div key={idx} className="mt-2">
                      <hr />
                      <hr />
                      <h5 className="text-center">{idx + 1}</h5>
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
