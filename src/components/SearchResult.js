import React from "react";
import { Card } from "react-bootstrap";

export default function SearchResult({ props }) {
  return Object.keys(props).map((key, index) => {
    return <td key={index}>{props[key]}</td>;
  });
}
