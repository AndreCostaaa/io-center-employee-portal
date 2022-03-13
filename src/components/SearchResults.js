import { useData } from "contexts/DataContext";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult";

export default function SearchResults() {
  const [idSelected, setIdSelected] = useState(0);
  const navigate = useNavigate();
  const { searchResults } = useData();
  const kTableHeader = ["#", "Prénom", "Adresse", "Marque", "Plaque"];

  useEffect(() => {}, []);
  return (
    <>
      <Table className="table table-bordered mt-5">
        <thead>
          <tr>
            {kTableHeader.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {searchResults &&
            searchResults.map((value, index) => {
              return (
                <tr
                  key={index}
                  className={
                    (index + 1 === idSelected ? "table-active" : "") +
                    " text-center"
                  }
                  onClick={() => {
                    let id = index + 1;
                    if (idSelected === id) {
                      setIdSelected(0);
                      return;
                    }
                    setIdSelected(index + 1);
                  }}
                ></tr>
              );
            })}
        </tbody>
      </Table>
      <Card className="mt-2">
        <Card.Body>
          <Row className="gx-1">
            <Button onClick={() => {}} className="w-50 border">
              Détails
            </Button>
            <Button onClick={() => {}} className="w-50 border">
              Nouveau Service
            </Button>
          </Row>
        </Card.Body>
      </Card>
      <h1>{idSelected}</h1>
    </>
  );
}
