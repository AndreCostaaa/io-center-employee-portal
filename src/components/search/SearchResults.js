import { useData } from "contexts/DataContext";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult";

export default function SearchResults() {
  const navigate = useNavigate();
  const { searchResults, setId, id } = useData();
  const kTableHeader = ["#", "Nom", "Adresse", "Marque", "Plaque"];

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
                    (index + 1 === id ? "table-active" : "") + " text-center"
                  }
                  onClick={() => {
                    let selected = index + 1;
                    if (id === selected) {
                      setId(0);
                      return;
                    }
                    setId(selected);
                  }}
                >
                  <SearchResult props={value}></SearchResult>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {id ? (
        <Card className="mt-2">
          <Card.Body>
            <Row className="gx-1">
              <Button
                onClick={() => {
                  navigate("/detail-page");
                }}
                className="w-50 border"
              >
                Détails
              </Button>
              <Button onClick={() => {}} className="w-50 border">
                Nouveau Service
              </Button>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}
