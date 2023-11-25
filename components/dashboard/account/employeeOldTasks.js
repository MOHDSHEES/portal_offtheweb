import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";
import FormatDate from "@/components/functions/formatDate";
import capital from "@/components/functions/capitaliseStr";
import { Alert, Button } from "@mui/material";
import TaskAssign from "@/components/employee/taskAssign";
import { MyContext } from "@/components/context";
import { closeMessage } from "@/components/functions/message";
// import TaskAssign from "../admin/taskAssign";

const EmployeeOldTasks = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { user, messageApi } = useContext(MyContext);
  const [radio, setRadio] = useState("1");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    props.data && props.data.tasks && props.data.tasks
  );

  useEffect(() => {
    if (props.data && props.data.tasks) setData(props.data.tasks);
  }, [props.data]);

  // filter function
  function onOptionChange(e) {
    setRadio(e.target.value);
    if (e.target.value === "2") {
      setLoading(true);
      const d = props.data.tasks.filter(
        (task) => task.status === 0 && task.assignDate !== props.assignDate
      );
      setLoading(false);
      setData(d);
    } else if (e.target.value === "3") {
      setLoading(true);
      const d = props.data.tasks.filter(
        (task) => task.status === 1 && task.assignDate !== props.assignDate
      );
      setLoading(false);
      setData(d);
    } else {
      setLoading(false);
      setData(props.data.tasks);
    }
  }

  // console.log(props);
  //   console.log(loading);
  // console.log(data);

  const [oldTask, setOldTask] = useState(null);
  async function editTask(task) {
    if (user.employeeId === "1885816702") {
      closeMessage(
        messageApi,
        "Demo account does not support this feature",
        "info"
      );
    } else {
      if (
        props.isAdmin &&
        props.data.status &&
        props.adminLevel &&
        (props.adminLevel === 1 || props.adminLevel < props.data.adminLevel)
      ) {
        setOldTask(task);
        setModalShow(true);
      }
    }
  }
  return (
    <div>
      {/* {contextHolder} */}
      <Modal
        // onExit={() => {
        //   clear();
        // }}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Previous Tasks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div class="form-text mb-3">
            Emp. Id: <br />
            Name:
          </div> */}
          {/* {!flag && <div>No. previous Tasks </div>} */}
          <br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="1"
              checked={radio === "1"}
              onChange={onOptionChange}
            />
            <label class="form-check-label" for="inlineRadio1">
              All
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="2"
              checked={radio === "2"}
              onChange={onOptionChange}
            />
            <label class="form-check-label" for="inlineRadio2">
              Incomplete
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="3"
              checked={radio === "3"}
              onChange={onOptionChange}
            />
            <label class="form-check-label" for="inlineRadio3">
              Completed
            </label>
          </div>
          {loading ? (
            "Loading..."
          ) : data && data.length !== 0 ? (
            <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
              <>
                <ol
                  className="list-group list-group-flush rounded-3"
                  style={{ fontSize: "0.8rem" }}
                >
                  {data.map((task, idx) => {
                    return (
                      <>
                        {task.assignDate !== props.assignDate && (
                          <div>
                            <li
                              onClick={() => editTask(task)}
                              style={{
                                backgroundColor: "#fbf8f8",
                                overflow: "auto",
                              }}
                              className={`${
                                props.isAdmin && "tasks"
                              } list-group-item justify-content-between align-items-center p-3`}
                            >
                              <p
                                className="mb-1"
                                key={idx}
                                style={{ fontSize: ".77rem" }}
                              >
                                <span style={{ fontWeight: 600 }}>
                                  {task.taskNo} Task: {task.assignDate}
                                  {!task.status && !props.isAdmin && (
                                    // <span
                                    //   onClick={() =>
                                    //     props.updateStatus(task.taskNo)
                                    //   }
                                    //   style={{
                                    //     float: "right",
                                    //   }}
                                    //   className="text-link-blue"
                                    // >
                                    //   Mark as Complete
                                    // </span>
                                    <Button
                                      color="primary"
                                      size="small"
                                      style={{
                                        float: "right",
                                      }}
                                      onClick={() =>
                                        props.updateStatus(task.taskNo)
                                      }
                                    >
                                      <small>Mark as Complete</small>
                                    </Button>
                                  )}
                                  {/* <span
                                        style={{
                                          float: "right",
                                          color: task.status ? "green " : "red",
                                        }}
                                      >
                                        {task.status
                                          ? "Completed"
                                          : "Incomplete"}
                                      </span> */}
                                  <br />
                                </span>{" "}
                                {capital(task.task)
                                  .split("\n")
                                  .map((str, idx) => {
                                    // console.log(str);
                                    return (
                                      <p
                                        key={idx}
                                        style={{
                                          marginBottom: 0,
                                        }}
                                      >
                                        {parse(str)}
                                      </p>
                                    );
                                  })}
                                <br />
                                {/* {!task.status && !props.isAdmin && (
                                      <p
                                        onClick={() =>
                                          props.updateStatus(task.taskNo)
                                        }
                                        className="text-link-blue mt-2"
                                        style={{ float: "right" }}
                                      >
                                        Mark as Complete
                                      </p>
                                    )} */}
                              </p>
                            </li>
                            <table class="table table-bordered">
                              <thead>
                                <tr className="table-active">
                                  <th scope="col">Status</th>
                                  <th scope="col">
                                    {task.status && task.completedAt
                                      ? "Submited At"
                                      : "Last Submitted At"}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{
                                      color: task.status ? "green " : "red",
                                    }}
                                  >
                                    {task.status ? "Completed" : "Incomplete"}
                                  </th>
                                  <td>
                                    {task.completedAt
                                      ? FormatDate(task.completedAt)
                                      : "Not submitted"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    );
                  })}
                </ol>
              </>
            </div>
          ) : (
            <Alert className="mt-3" severity="info">
              No Tasks Found.
            </Alert>
          )}
        </Modal.Body>
      </Modal>

      <TaskAssign
        employees={props.employees}
        oldTask={oldTask}
        employee={props.data}
        // setFilteredEmployees={props.setFilteredEmployees}
        onOptionChange={props.onOptionChange}
        radio={props.radio}
        setEmployees={props.setEmployees}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default EmployeeOldTasks;
