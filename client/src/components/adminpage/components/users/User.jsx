import { Link } from "react-router-dom";
import React from "react";
import {  Table, TableContainer } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "semantic-ui-react";

export default function Users({ users }) {
  return (
    <TableContainer className="table">
      <div className="datatable">
        <div className="datatableTitle">
          <Link to="/dashboard/createUser" className="link">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add New User
            </Button>
          </Link>
        </div>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>FirstName</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>IsActive</Table.Cell>
            <Table.Cell>Actions</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users && users.length > 0 ? (
            users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.isActive ? "true" : "false"}</Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/dashboard/users/${user.id}`}
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="6">No users found</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </TableContainer>
  );
}
