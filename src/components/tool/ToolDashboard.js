import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ToolForm from "./ToolForm";
import ToolList from "./ToolList";

export default function ToolDashboard() {
  const [toolList, setToolList] = useState();
  const [fetchData, setFetchData] = useState(true);
  const { getAllTools } = useData();
  async function fetchTools() {
    await getAllTools().then((res) => {
      if (res.status === 200) {
        setToolList(res.message);
      }
    });
  }
  useEffect(() => {
    if (fetchData) {
      fetchTools();
      setFetchData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <Card>
      <ToolForm setFetchData={setFetchData} />
      <ToolList toolList={toolList} setFetchData={setFetchData} />
    </Card>
  );
}
