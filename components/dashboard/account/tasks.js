import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Button,
  SvgIcon,
  Typography,
  Alert,
} from "@mui/material";
import { MyContext } from "@/components/context";
import RefreshIcon from "@mui/icons-material/Refresh";
import capital from "@/components/functions/capitaliseStr";
import parse from "html-react-parser";
import FormatDate from "@/components/functions/formatDate";
import { closeMessage, openMessage } from "@/components/functions/message";
import axios from "axios";
import { set } from "mongoose";
import EmployeeOldTasks from "./employeeOldTasks";

export const Tasks = () => {
  const { user, messageApi, setUser } = useContext(MyContext);
  const [oldTasksModal, setOldTasksModal] = useState(false);

  let flag = 1;
  useEffect(() => {
    if (user && flag) {
      setEmployee(user);
      flag = 0;
    }
  }, [user]);
  const [employee, setEmployee] = useState(user);
  const [assignDate, setAssignDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [todayTask, setTodayTask] = useState([]);
  useEffect(() => {
    if (employee && employee.tasks) {
      //   setTodayTask(employee.tasks);
      new Date().toJSON().slice(0, 10);
      const today = employee.tasks.filter(
        (emp) => emp.assignDate === assignDate
      );
      setTodayTask(today);
    }
  }, [employee, assignDate]);

  async function getEmployeeData() {
    // setLoading(true);
    // setRefreshing(true);
    const { data } = await axios.post("/api/getEmployee", {
      email: user.email,
    });
    if (data) {
      closeMessage(messageApi, "Updated Sucessfully", "success");
      setEmployee(data);
      setUser(data);
    } else {
      closeMessage(
        messageApi,
        "Something went Wrong. Try again later.",
        "error"
      );
    }
  }

  async function updateStatus(taskNo) {
    openMessage(messageApi, "Updating Status...");
    const { data } = await axios.post("/api/employee/updateTaskStatus", {
      email: employee.email,
      taskNo: taskNo,
      status: 1,
    });
    if (data.status === 200) {
      const updatedData = todayTask.map((c, i) => {
        if (c.taskNo === taskNo) {
          return { ...c, status: 1 };
        } else return c;
      });
      setTodayTask(updatedData);
      getEmployeeData();
      closeMessage(messageApi, data.msg, "success");
    } else {
      closeMessage(messageApi, data.msg, "error");
    }
  }

  return (
    <Card sx={{ p: 2 }}>
      <CardHeader
        title="Today's Tasks:"
        action={
          <Button
            color="inherit"
            onClick={() => getEmployeeData()}
            size="small"
            startIcon={
              <SvgIcon fontSize="small">
                <RefreshIcon />
              </SvgIcon>
            }
          >
            Refresh
          </Button>
        }
      />
      <CardContent sx={{ pt: 0 }} className="mt-3">
        <Box sx={{ m: -1.5 }}>
          {todayTask && todayTask.length !== 0 ? (
            <>
              <ol
                className="list-group list-group-flush rounded-3"
                style={{ fontSize: "0.8rem" }}
              >
                {/* {tasks(employee.tasks)} */}
                {todayTask.map((task, idx) => {
                  return (
                    <>
                      {task.assignDate === assignDate && (
                        <div>
                          <li className="list-group-item justify-content-between align-items-center p-3">
                            <p
                              className="mb-1"
                              key={idx}
                              style={{ fontSize: ".77rem" }}
                            >
                              <span style={{ fontWeight: 600 }}>
                                Task {task.taskNo}:
                                <span
                                  style={{
                                    float: "right",
                                    color: task.status ? "green " : "red",
                                  }}
                                >
                                  {!task.status && (
                                    <Button
                                      color="inherit"
                                      size="small"
                                      onClick={() => updateStatus(task.taskNo)}
                                    >
                                      <small>Mark as Complete</small>
                                    </Button>
                                  )}
                                </span>
                                <br />
                              </span>{" "}
                              <div className="mt-2">
                                {capital(task.task)
                                  .split("\n")
                                  .map((str, idx) => (
                                    <Typography
                                      key={idx}
                                      variant="body2"
                                      style={{ marginBottom: 0 }}
                                    >
                                      {parse(str)}
                                    </Typography>
                                  ))}
                              </div>
                              <br />
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
          ) : (
            <Alert className="mt-3" severity="info">
              No task for Today.
            </Alert>
            // <Typography className="ms-1">No task for Today.</Typography>
          )}
          {todayTask &&
            employee &&
            todayTask.length !== employee.tasks.length && (
              <Button
                className="ms-1 mt-3"
                onClick={() => setOldTasksModal(true)}
                variant="contained"
              >
                Previous Tasks
              </Button>
            )}
        </Box>
      </CardContent>
      <EmployeeOldTasks
        updateStatus={updateStatus}
        show={oldTasksModal}
        assignDate={assignDate}
        onHide={() => setOldTasksModal(false)}
        data={employee}
      />
    </Card>
  );
};
