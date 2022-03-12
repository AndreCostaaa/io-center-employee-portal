import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";
import SearchResult from "./SearchResult";

export default function DisplaySearchResults({ props }) {
  const [idSelected, setIdSelected] = useState("");

  const kTableHeader = ["#", "Prénom", "Adresse", "Marque", "Plaque"];
  return (
    <>
      <Table className="table table-bordered">
        <thead>
          <tr>
            {kTableHeader.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props &&
            props.map((value, index) => {
              return (
                <tr
                  key={index}
                  className={index + 1 === idSelected ? "table-dark" : ""}
                  onClick={() => {
                    let id = index + 1;
                    if (idSelected === id) {
                      setIdSelected(0);
                      return;
                    }

                    setIdSelected(index + 1);
                  }}
                >
                  <SearchResult props={value} />
                </tr>
              );
            })}
        </tbody>
      </Table>
      <h1>{idSelected}</h1>
    </>
  );
}
