import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function UserDashboard() {
  const [creatingUser, setCreatingUser] = useState(false);

  const [userList, setUserList] = useState();
  const { getAllUsers } = useData();
  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers().then((res) => {
        if (res.status === 200) {
          setUserList(res.message);
        }
      });
    };
    fetchData();
  }, [creatingUser]);
  return (
    <>
      <div>
        <UserList users={userList} />
      </div>

      <div className="mt-2 text-center">
        {creatingUser && <UserForm />}
        <Button
          className="w-100 mt-2"
          onClick={() => setCreatingUser(!creatingUser)}
        >
          {!creatingUser ? "Créer Utilisateur" : "Annuler"}
        </Button>
      </div>
    </>
  );
}
