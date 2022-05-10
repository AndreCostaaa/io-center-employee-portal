import { useAuth } from "contexts/AuthContext";
import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function UserDashboard() {
  const [creatingUser, setCreatingUser] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [userList, setUserList] = useState();
  const navigate = useNavigate();
  const { getAllUsers } = useData();
  const { getCurrentUser } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers().then((res) => {
        if (res.status === 200) {
          setUserList(res.message);
        }
      });
    };
    if (fetchData) {
      fetchData();
      setFetchData(false);
    }
  }, [fetchData, getAllUsers]);

  useEffect(() => {
    if (getCurrentUser().role !== "admin") {
      navigate("/dashboard");
    }
  }, [getCurrentUser, navigate]);
  return (
    <div>
      <div>
        <UserList users={userList} setDataChanged={setFetchData} />
      </div>

      <div className="mt-2">
        {creatingUser && (
          <UserForm
            setCreating={setCreatingUser}
            setDataChanged={setFetchData}
          />
        )}
        <Button
          variant="dark"
          className="w-100 mt-2"
          onClick={() => setCreatingUser(!creatingUser)}
        >
          {!creatingUser ? "Créer Utilisateur" : "Annuler"}
        </Button>
      </div>
    </div>
  );
}
