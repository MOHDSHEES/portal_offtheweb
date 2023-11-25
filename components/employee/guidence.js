import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";
import { MyContext } from "../context";

const Guidence = (props) => {
  const { messageApi } = useContext(MyContext);
  const [manager, setManager] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    if (manager === "")
      closeMessage(messageApi, "Manager can not be empty", "error");
    props.releaseCertificate(true, manager);
    props.onHide();
    // console.log(manager);
  }
  return (
    <div>
      <Modal
        onExit={() => {
          setManager("");
        }}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-text mb-3">
            Please select the name under whom Employee is working.
            <form onSubmit={submitHandler}>
              <select
                class="form-select mt-3"
                aria-label="Default select example"
                onChange={(e) => setManager(e.target.value)}
                value={manager}
                required
              >
                <option selected>Select Manager</option>
                <option value="Deepak Kumar">Deepak Kumar</option>
                <option value="Anas Adnan">Anas Adnan</option>
              </select>
              <button
                className="btn btn-primary mt-3"
                type="submit"
                style={{ float: "right" }}
              >
                Issue
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Guidence;
