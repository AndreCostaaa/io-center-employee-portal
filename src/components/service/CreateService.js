import { useData } from "contexts/DataContext";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateService({ setCreating }) {
  const [service, setService] = useState("");
  const [machine, setMachine] = useState("");
  const [loading, setLoading] = useState(true);
  const kmRef = useRef();
  const picturesRef = useRef();
  const filesRef = useRef();
  const [gestanId, setGestanId] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const { createService, carSelected, getMachineList, getAllServiceTypes } =
    useData();
  const { getCurrentUser } = useAuth();
  useEffect(() => {
    setServicesList(["Service", "Installation", "Réparation", "Optimisation"]);
    async function fetchData() {
      await getAllServiceTypes().then((res) => {
        if (res.status === 200) {
          setServiceTypeList(res.message);
        }
      });
      await getMachineList().then((res) => {
        if (res.status === 200) {
          setMachineList(res.message);
        }
      });
    }
    fetchData();
    setLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!kmRef.current.value) {
      kmRef.current.focus();
      return;
    }

    let fd = new FormData();

    for (let i in picturesRef.current.files) {
      fd.append("picture_" + i.toString(), picturesRef.current.files[i]);
    }
    for (let i in filesRef.current.files) {
      fd.append("file_" + i.toString(), filesRef.current.files[i]);
    }
    fd.append("type", service);
    fd.append("date", date);
    fd.append("km", kmRef.current.value);
    fd.append("description", description);
    fd.append("machine_id", machine ? machine.id : null);
    fd.append("gestan_id", gestanId);
    fd.append("vehicle_id", carSelected.id);
    fd.append("mechanic_id", getCurrentUser().id);
    await createService(fd);
    setCreating(false);
  }
  return loading ? (
    <h1> Loading </h1>
  ) : (
    <>
      <Card className="bg-transparent">
        <Card.Header>
          <h2 className="text-center">Nouveau Service</h2>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Type de Service</Form.Label>

            <Form.Select
              onChange={(e) => setService(e.target.value.toLowerCase())}
              defaultValue="none"
            >
              <option value="none" disabled hidden>
                Choisir Type de Service
              </option>
              {serviceTypeList.map((service, idx) => {
                return <option key={idx}>{service.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Machine de Lecture Utilisée</Form.Label>
            <Form.Select
              onChange={(e) => setMachine(e.target.value.toLowerCase())}
              defaultValue={"none"}
            >
              <option value="none" disabled hidden>
                Choisir Machine
              </option>
              {machineList.map((machine, idx) => {
                return <option key={idx}>{machine.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <h4 className="text-center mt-2">{machine ? machine.name : ""}</h4>
          {service ? (
            <Form>
              <Form.Group className="mt-2">
                <Form.Label>Descriptif</Form.Label>
                <Form.Control
                  className="w-100"
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Km</Form.Label>
                <Form.Control
                  className="w-100"
                  type="number"
                  min="0"
                  ref={kmRef}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>ID Gestan</Form.Label>
                <Form.Control
                  className="w-100"
                  type="number"
                  min="0"
                  onChange={(e) => setGestanId(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Photos</Form.Label>
                <Form.Control ref={picturesRef} type="file" multiple />
              </Form.Group>
              <Form.Group>
                <Form.Label>Files</Form.Label>
                <Form.Control ref={filesRef} type="file" multiple />
              </Form.Group>
              <Button
                variant="dark"
                onClick={handleSubmit}
                className="w-100 mt-3"
              >
                Submit
              </Button>
            </Form>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
}
