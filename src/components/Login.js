import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, verifyStoredToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (await verifyStoredToken()) {
        navigate("/dashboard");
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);
  async function onClick(e) {
    e.preventDefault();
    if (!username) {
      setError("Username required");
      return;
    }
    if (!password) {
      setError("Password required");
      return;
    }
    setError("Logging In");
    console.log(await login(username, password));
    if (await login(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Username or password do not match");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Button onClick={onClick} className="w-100 mt-2" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
