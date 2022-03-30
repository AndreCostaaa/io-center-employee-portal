import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import ClientInformation from "./ClientInformation";

export default function ClientSearchResults({ clientsToDisplay }) {
  const [clientHovered, setClientHovered] = useState();
  const { setClientSelected } = useData();
  return (
    <Card className="mt-2">
      <Card.Header>
        <h2 className="text-center">Clients Existants</h2>
      </Card.Header>
      <Card.Body>
        {clientsToDisplay && clientsToDisplay.length > 0 ? (
          <Table className="text-center">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Adresse</th>
                <th>E-mail</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {clientsToDisplay &&
                clientsToDisplay.map((client, idx) => (
                  <ClientInformation
                    key={idx}
                    client={client}
                    callback={setClientHovered}
                    hovered={clientHovered && clientHovered.id === client.id}
                  />
                ))}
            </tbody>
          </Table>
        ) : (
          <h4 className="text-center">Aucun client trouvé</h4>
        )}
        {clientHovered && (
          <Button
            className="w-100 mt-3"
            onClick={() => setClientSelected(clientHovered)}
          >
            Selectionner
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
