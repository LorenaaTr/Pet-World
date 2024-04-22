import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import axios from "axios";
import Sidebar from "../../sidebar/Sidebar";

export default function EditUser({ users }) {
  const params = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    country: "",
    streetAddress: "",
    about: "",
    imageCover: ""
  });
  const [imageCover, setImageCover] = useState(null);

  const handleImageCoverChange = (e) => {
    const file = e.target.files[0];
    setImageCover(file);
  };
  const roles = ["admin", "manager", "employee", "user"];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${params.id}`
        );
        console.log(response.data);
        setUser(response.data.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [params.id]);

  if (!user.firstName) {
    return <div>Loading...</div>;
  }
  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("role", user.role);
      formData.append("country", user.country);
      formData.append("streetAddress", user.streetAddress);
      formData.append("about", user.about);
      formData.append("imageCover", imageCover);

      const response = await axios.patch(
        `http://localhost:3001/users/updateUser/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status !== 200) {
        throw new Error("Error saving data");
      }

      console.log("Data saved successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 5, margin: "50px" }}>
        <div className="top gap-4 mb-4">
          <h1>Add/Edit</h1>
        </div>
        <div className="bottom">
          <div className="flex flex-wrap gap-4">
            <div className="w-1/3">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered input-accent w-full"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered input-accent w-full"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-accent w-full"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="w-1/3">
              <select
                className="input input-bordered input-accent w-full"
                value={user.role}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Country"
                className="input input-bordered input-accent w-full"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Street Address"
                className="input input-bordered input-accent w-full"
                value={user.streetAddress}
                onChange={(e) =>
                  setUser({ ...user, streetAddress: e.target.value })
                }
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="About"
                className="input input-bordered input-accent w-full"
                value={user.about}
                onChange={(e) => setUser({ ...user, about: e.target.value })}
              />
            </div>
            <div className="w-1/3">
              <input type="file" onChange={handleImageCoverChange} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            as={Link}
            to="/dashboard/users"
            type="button"
            content="Cancel"
            style={{ marginRight: "10px" }}
          />
          <Button onClick={handleSave} style={{ marginLeft: "10px" }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
