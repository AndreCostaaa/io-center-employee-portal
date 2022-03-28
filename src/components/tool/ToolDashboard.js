import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ToolForm from "./ToolForm";
import ToolList from "./ToolList";

export default function ToolDashboard() {
  return (
    <Card>
      <ToolForm />
      <ToolList />
    </Card>
  );
}
