import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Sidebar from "../../sidebar/Sidebar";
import axios from "axios";

export default function EditCategory() {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [imageCover, setimageCover] = useState(null);
  const [parentId, setParentId] = useState("");
  const [parentOptions, setParentOptions] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/category/${categoryId}`
        );
        const category = response.data.category;
        setName(category.name);
        setType(category.type);
        setParentId(category.parentId);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchParentOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3001/category");
        setParentOptions(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryData();
    fetchParentOptions();
  }, [categoryId]);
  console.log(categoryId);
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("imageCover", imageCover);
      formData.append("parentId", parentId);

      const response = await axios.patch(
        `http://localhost:3001/category/${categoryId}`,
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

  const typeOptions = ["Category", "Subcategory"];

  const handleParentIdChange = (e) => {
    setParentId(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageCover(file);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 5, margin: "50px" }}>
        <div className="top gap-4 mb-4">
          <h1>Edit Category</h1>
        </div>
        <div className="bottom">
          <div className="flex flex-wrap gap-4">
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered input-accent w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <select
                className="input input-bordered input-accent w-full"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="">Select Type</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <input
                type="file"
                className="input input-bordered input-accent w-full"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="w-1/3">
              <select
                className="input input-bordered input-accent w-full"
                value={parentId}
                onChange={handleParentIdChange}
              >
                <option value="">Select Parent</option>
                {parentOptions.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            as={Link}
            to="/dashboard/category"
            type="button"
            content="Cancel"
            style={{ marginRight: "10px" }}
          />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
