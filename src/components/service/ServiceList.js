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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating]);
  return (
    <Card className="bg-transparent">
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Service</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => {
              setCreating(!creating);
            }}
          >
            {creating ? "Annuler" : "Créer Nouveau Service"}
          </Button>
          {creating && <CreateService setCreating={setCreating} />}
          <Button
            variant="dark"
            className="w-100 mt-2"
            onClick={() => setShowingHistory(!showingHistory)}
          >
            {showingHistory ? "Cacher Historique" : "Regarder Historique"}
          </Button>

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
