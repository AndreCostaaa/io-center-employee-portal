import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function ClientInformation(props) {
  let client = props.client;
  return (
    <tr
      className={
        "text-break" + (props.hovered ? " table-active" : " table-default")
      }
      style={{ wordWrap: "break-word" }}
      onClick={(e) =>
        props.hovered ? props.callback(0) : props.callback(client)
      }
    >
      <td>
        {client.name} <br />
        {client.last_name}
      </td>
      <td>
        {client.address} <br /> {client.city} {" " + client.npa}
      </td>
      <td>{client.email}</td>
      <td>{client.phone_number}</td>
    </tr>
  );
}
