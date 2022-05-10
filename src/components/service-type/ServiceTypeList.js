import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import ServiceType from "./ServiceType";

export default function ServiceTypeList({ serviceTypeList, setFetchData }) {
  const { deleteServiceType } = useData();
  const [serviceTypeHovered, setServiceTypeHovered] = useState(null);

  async function deleteBtnClicked() {
    await deleteServiceType(serviceTypeHovered.id).then((res) => {
      if (res.status === 200) {
        setFetchData(true);
      }
    });
  }

  return (
    <Card className="bg-transparent">
      <Card.Header>
        <h2 className="text-center">Liste de types de service</h2>
      </Card.Header>
      <Card.Body>
        <Table className="text-center">
          <thead>
            <tr>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {serviceTypeList &&
              serviceTypeList.map((serviceType, idx) => (
                <ServiceType
                  key={idx}
                  serviceType={serviceType}
                  callback={setServiceTypeHovered}
                  hovered={
                    serviceTypeHovered &&
                    serviceTypeHovered.id === serviceType.id
                  }
                />
              ))}
          </tbody>
        </Table>
        {serviceTypeHovered && (
          <Button variant="dark" className="w-100" onClick={deleteBtnClicked}>
            Supprimer Type de Service
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
