import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    var firstName = event.target.value;
    setName(firstName);
  };
  const handleEmailChange = (event) => {
    var email = event.target.value;
    setEmail(email);
  };
  const handlePasswordChange = (event) => {
    var password = event.target.value;
    setPassword(password);
  };
  const handleConfirmationPasswordChange = (event) => {
    var confirmationPassword = event.target.value;
    setConfirmationPassword(confirmationPassword);
  };

  const registerInfo = {
    firstName: firstName,
    email: email,
    password: password,
    confirmation_password: confirmationPassword,
    role: "user"
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        registerInfo
      );
      window.localStorage.setItem("jwt", response.data.token);
      navigate("/");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
       {/** <img
        src="../../../images/loginphoto.png"
        alt="loginphoto"
        className="my-4"
      /> */}

      <div className="text-2xl font-bold mb-4 text-center">
        Let's get to know each other first..
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col mr-9">
            <label htmlFor="firstName" className="mb-2 font-bold">
              Name
            </label>
            <input
              onChange={(event) => handleNameChange(event)}
              type="text"
              id="firstName"
              className="px-7 py-2 rounded-none border-gray-400 border-2 focus:outline-none focus:border-blue-500 h-12"
            />
            <label htmlFor="password" className="mt-4 mb-2 font-bold">
              Password
            </label>

            <input
              onChange={(event) => handlePasswordChange(event)}
              type="password"
              id="password"
              className="px-7 py-2 rounded-none border-gray-400 border-2 focus:outline-none focus:border-blue-500 h-12"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-bold">
              Email
            </label>
            <input
              onChange={(event) => handleEmailChange(event)}
              type="email"
              id="email"
              className="px-7 py-2 rounded-none border-gray-400 border-2 focus:outline-none focus:border-blue-500 h-12"
            />
            <label htmlFor="password" className="mt-4 mb-2 font-bold">
              Confirmation Password
            </label>
            <input
              onChange={(event) => handleConfirmationPasswordChange(event)}
              type="password"
              id="confirmationPassword"
              className="px-7 py-2 rounded-none border-gray-400 border-2 focus:outline-none focus:border-blue-500 h-12"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-20 py-2 mt-8 rounded-none bg-green-900 text-white hover:bg-green-900 focus:outline-none focus:bg-green-500">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
