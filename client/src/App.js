import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/homepage/Home";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";


function App() {
  const dispatch = useDispatch();

  const token = window.localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/users/me")
        .then((res) => {
          dispatch(setUser(res.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, dispatch]);
  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      dispatch(setUser(data.user._json));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
   <Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        style={{ width: "400px" }}
      />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
   </Layout>
  );
}

export default App;
