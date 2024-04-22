import { Link } from "react-router-dom";
// import { Button, Table, TableContainer } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Item, Segment, Table } from "semantic-ui-react";
import axios from "axios";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export default function Category({ category }) {
  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/category/${categoryId}`
      );
      if (response.status === 200) {
        console.log("Category deleted successfully!");
        window.location.reload();
      } else {
        throw new Error("Error deleting category");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TableContainer className="table">
      <div className="datatable">
        <div className="datatableTitle">
          <Link to="/dashboard/createCategory" className="link">
            <Button inverted content="Add New" color="brown" />
          </Link>
        </div>
      </div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>ImageCover</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {category.map((cat) => (
            <Table.Row key={cat._id}>
              <Table.Cell>{cat._id}</Table.Cell>
              <Table.Cell>{cat.name}</Table.Cell>
              <Table.Cell>{cat.type}</Table.Cell>
              <Table.Cell>{cat.imageCover}</Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  as={Link}
                  to={`/dashboard/category/${cat._id}`}
                  className="ui inverted blue button"
                  color="blue"
                  content="Edit"
                />

                <Button
                  inverted
                  content="Delete"
                  color="red"
                  onClick={() => handleDelete(cat._id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>{" "}
    </TableContainer>
  );
}
