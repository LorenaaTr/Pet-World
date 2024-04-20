import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginInfo = {
    email: email,
    password: password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        loginInfo
      );
      window.localStorage.setItem("jwt", response.data.access_token);

      navigate("/");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  const handleEmailChange = (event) => {
    var getEmail = event.target.value;
    setEmail(getEmail);
  };

  const handlePasswordChange = (event) => {
    var getPassword = event.target.value;
    setPassword(getPassword);
  };

  return (
    <div className="flex flex-col items-center p-20">
      {/** <img
        src="../../../images/loginphoto.png"
        alt="loginphoto"
        className="my-4"
      /> */}

      <div className="text-2xl font-bold mb-4 text-center">
        Great to see you again!
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center ">
          <div className="flex flex-col mr-8">
            <label htmlFor="email" className="mt-4 mb-2 font-bold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="px-7 py-2 rounded-none border-gray-400 border-2 focus:outline-none focus:border-blue-500 h-12"
              value={email}
              onChange={(event) => handleEmailChange(event)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mt-4 mb-2 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="px-7 py-2 rounded-none border-gray-400 border-2 focus:outline-none focus:border-blue-500 h-12"
              value={password}
              onChange={(event) => handlePasswordChange(event)}
            />
          </div>
        </div>

        <div className="mt-4 text-blue-500 hover:underline font-bold">
          <NavLink to="/forgotPassword">Forgot your password?</NavLink>
        </div>

        <div className="flex justify-center">
          <button className="px-20 py-2 mt-8 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700">
            LogIn
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={googleAuth}
            className="mt-8 flex justify-center rounded-lg  text-black focus:outline-none focus:bg-gray-700 border-2px"
            style={{
              padding: "0.5rem",
              fontSize: "0.875rem",
              border: "solid black 2px",
            }}
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="google icon"
              style={{ width: "20px", marginRight: "0.5rem" }}
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
