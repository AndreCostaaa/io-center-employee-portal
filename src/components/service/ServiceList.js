import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useData } from "contexts/DataContext";
import Service from "./Service";
import CreateService from "./CreateService";
export default function DetailClient() {
  const {
    carSelected,
    getServicesDone,
    setLastServiceData,
    serviceList,
    setServiceList,
    getServicePictureById,
    getMechanicNameById,
    getToolNameById,
    addPicturesToService,
    addMechanicNameToService,
    addMachineNameToService,
  } = useData();
  const [visible, setVisible] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showingHistory, setShowingHistory] = useState(false);
  const fetchServicesData = async () => {
    await getServicesDone(carSelected.id).then((response) => {
      if (response.status === 200) {
        setServiceList(Object.values(response.message));
        const lastService = response.message[response.message.length - 1];
        setLastServiceData(lastService.date, lastService.km);
      }
    });
  };
  useEffect(() => {
    async function fetchData(index) {
      const service = serviceList[index];
      if (!service.mechanicName) {
        await getMechanicNameById(service.mechanic_id).then((res) => {
          if (res.status === 200) {
            addMechanicNameToService(service.id, res.message.name);
          }
        });
      }
      if (!service.machineName) {
        await getToolNameById(service.machine_id).then((res) => {
          if (res.status === 200) {
            addMachineNameToService(service.id, res.message.name);
          }
        });
      }
      if (!service.pictureList) {
        let i = 0;
        let fetch = true;
        let pictures = [];
        while (fetch) {
          await getServicePictureById(service.id, i).then((res) => {
            if (res.status === 200 || res.status === 304) {
              pictures.push(res.message);
            } else if (res.status !== 502) {
              fetch = false;
            }
          });
          i++;
        }
        addPicturesToService(service.id, pictures);
      }
    }

    for (let i = 0; i < serviceList.length; i++) {
      fetchData(i);
    }
  }, [serviceList]);

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
            className="w-100 mb-2"
            onClick={() => {
              setCreating(!creating);
            }}
          >
            {creating ? "Annuler" : "Créer Nouveau Service"}
          </Button>
          {creating && <CreateService setCreating={setCreating} />}
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setShowingHistory(!showingHistory)}
          >
            {showingHistory ? "Cacher Historique" : "Regarder Historique"}
          </Button>

          {showingHistory ? (
            serviceList.length > 0 ? (
              serviceList
                .slice(0)
                .reverse()
                .map((service, idx) => {
                  return (
                    <div key={idx} className="mt-2">
                      <hr />
                      <hr />
                      <h5 className="text-center">{idx + 1}</h5>
                      <Service props={service} />
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
