import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import Tool from "./Tool";

export default function ToolList({ toolList, setFetchData }) {
  const { getAllTools, deleteTool } = useData();
  const [toolHovered, setToolHovered] = useState(null);

  async function deleteBtnClicked() {
    await deleteTool(toolHovered.id).then((res) => {
      if (res.status === 200) {
        setFetchData(true);
      }
    });
  }

  return (
    <Card>
      <Card.Header>
        <h2 className="text-center">Liste d'outils</h2>
      </Card.Header>
      <Card.Body>
        <Table className="text-center">
          <thead>
            <tr>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {toolList &&
              toolList.map((tool, idx) => (
                <Tool
                  key={idx}
                  tool={tool}
                  callback={setToolHovered}
                  hovered={toolHovered && toolHovered.id === tool.id}
                />
              ))}
          </tbody>
        </Table>
        {toolHovered && (
          <Button className="w-100" onClick={deleteBtnClicked}>
            Supprimer Outil
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
