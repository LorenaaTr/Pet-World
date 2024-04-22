import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Sidebar from "../../sidebar/Sidebar";
import axios from "axios";

export default function AddUser({ users }) {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation_password, setPassword2] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [about, setAbout] = useState("");
  const [imageCover, setImageCover] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/create", {
        firstName,
        lastName,
        email,
        role,
        country,
        password,
        confirmation_password,
        streetAddress,
        about,
        imageCover
      });

      if (response.status !== 200) {
        throw new Error("Error saving data");
      }

      // Data successfully saved
      console.log("Data saved successfully!");
    } catch (error) {
      console.error(error);
      // Handle the error as needed
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered input-accent w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-accent w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered input-accent w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered input-accent w-full"
                value={confirmation_password}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Role"
                className="input input-bordered input-accent w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Country"
                className="input input-bordered input-accent w-full"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Street Address"
                className="input input-bordered input-accent w-full"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="About"
                className="input input-bordered input-accent w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Image Cover"
                className="input input-bordered input-accent w-full"
                value={imageCover}
                onChange={(e) => setImageCover(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            as={Link}
            to="/dashboard/users"
            floated="left"
            type="button"
            content="Cancel"
          />
          <Button onClick={handleSave} style={{ marginLeft: "10px" }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
