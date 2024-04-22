import { Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./../../sidebar/Sidebar";
import "semantic-ui-css/semantic.min.css";
import Category from "./Category";
const CateoryPage = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/category")
      .then((response) => {
        setCategory(response.data.categories);
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
          <Category category={category} style={{ marginTop: "20px" }} />
        </div>
      </div>
    </>
  );
};
export default CateoryPage;
