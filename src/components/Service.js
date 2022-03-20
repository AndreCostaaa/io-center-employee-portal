import React from "react";
import { Button, Card, Table } from "react-bootstrap";

export default function Service({ props }) {
  return (
    <div className="text-center">
      <Table>
        <tbody>
          <tr>
            <td>
              <h5>{props.type}</h5>
            </td>
            <td>
              <h5>{props.mechanic_id}</h5>
            </td>
          </tr>
          <tr>
            <td>
              <h6>
                {"Date:"}
                <br /> {props.date && props.date.split(" ")[0]}
              </h6>
            </td>
            <td>
              <h6>
                {"Km:"}
                <br /> {props.km}
              </h6>
            </td>
          </tr>
        </tbody>
      </Table>
      <h6>
        Descriptif: <br />
        {props.description}
      </h6>

      <Button className="w-100 mt-2">Modifier</Button>
    </div>
  );
}
