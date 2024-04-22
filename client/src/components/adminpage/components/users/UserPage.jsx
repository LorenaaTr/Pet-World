import React, { useEffect, useState } from "react";
import axios from "axios";
import Users from "./User";
import Sidebar from "./../../sidebar/Sidebar";
import "semantic-ui-css/semantic.min.css";
const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Sidebar />
        </div>
        <div style={{ flex: 5, margin: "50px" }}>
          <Users users={users} style={{ marginTop: "20px" }} />
        </div>
      </div>
    </>
  );
};
export default UsersPage;
