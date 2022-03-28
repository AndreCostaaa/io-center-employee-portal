import React from "react";
import { Table } from "react-bootstrap";

export default function Tool(props) {
  const tool = props.tool;
  return (
    <tr
      className={
        "text-break" + (props.hovered ? " table-active" : " table-default")
      }
      style={{ wordWrap: "break-word" }}
      onClick={(e) =>
        props.hovered ? props.callback(null) : props.callback(tool)
      }
    >
      <td>{tool.name}</td>
    </tr>
  );
}
