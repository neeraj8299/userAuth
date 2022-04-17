import { React, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import APICall from "../API/APICall";
import "../App.css";
import Forms from "./Forms";
import Modals from "./Modal";

export default function Dashboard(props) {
  const [userData, setUserData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userRowData, setUserRowData] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleClose = (type) => {
    switch (type) {
      case "edit":
        setShowEditModal(false);
        break;
      case "delete":
        setShowDeleteModal(false);
        break;
      case "add":
        setShowAddModal(false);
        break;
    }
  };
  const handleShow = (type, data) => {
    setUserRowData(data);
    switch (type) {
      case "edit":
        setShowEditModal(true);
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      case "add":
        setShowAddModal(true);
        break;
    }
  };

  const handleSubmit = async (type) => {
    var body = userRowData;
    var url = "";
    var method = "";
    if (type == "edit") {
      url = `update`;
      method = "put";
    } else if (type == "delete") {
      url = `delete/${userRowData.id}`;
      method = "DELETE";
    } else {
      url = `save`;
      method = "post";
      body = newUserData;
    }

    APICall.callApi(
      url,
      {
        auth: cookies.token,
      },
      method,
      body
    )
      .then((response) => {
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
    handleClose(type);
  };

  const setFormData = (data) => {
    setUserRowData({
      ...userRowData,
      ...data,
    });
  };

  const addUserData = (data) => {
    setNewUserData({
      ...newUserData,
      ...data,
    });
  };

  const getData = async () => {
    var response = await APICall.callApi(`list`, {
      auth: cookies.token,
    });
    setUserData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  if (cookies.token) {
    return (
      <div>
        <Button
          variant="danger"
          className="float-right ml-3"
          onClick={() => removeCookie("token")}
        >
          Logout
        </Button>

        <Button
          variant="primary"
          className="float-right"
          onClick={() => handleShow("add")}
        >
          Add User
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userData.map((ele, index) => {
              return (
                <tr key={ele.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td
                    className="btn-style"
                    onClick={() => handleShow("edit", ele)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </td>
                  <td
                    className="btn-style"
                    onClick={() => handleShow("delete", ele)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Modals
          show={showAddModal}
          handleClose={handleClose}
          heading="Add User"
          body={<Forms userRowData={{}} setFormData={addUserData} />}
          successBtnTxt="Add User"
          isCentered={true}
          variant="primary"
          handleSubmit={handleSubmit}
          type="add"
        />

        <Modals
          show={showEditModal}
          handleClose={handleClose}
          heading="Edit User"
          body={<Forms userRowData={userRowData} setFormData={setFormData} />}
          successBtnTxt="Update"
          isCentered={true}
          variant="primary"
          handleSubmit={handleSubmit}
          type="edit"
        />
        <Modals
          show={showDeleteModal}
          handleClose={handleClose}
          heading="Delete User"
          body="are you sure you want to delete the user?"
          successBtnTxt="Delete"
          isCentered={false}
          variant="danger"
          handleSubmit={handleSubmit}
          type="delete"
        />
      </div>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
}
