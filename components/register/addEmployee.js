import { useCallback, useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import Form from "react-bootstrap/Form";
import { MyContext } from "../context";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import { closeMessage, openMessage } from "../functions/message";
import axios from "axios";

export const AddEmployee = () => {
  const { messageApi } = useContext(MyContext);
  const [validated, setValidated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [state, setstate] = useState({
    email: "",
    joiningDate: "",
    post: "",
    jobType: "",
    adminLevel: 10,
  });
  function clear() {
    setstate({
      email: "",
      joiningDate: "",
      post: "",
      jobType: "",
      adminLevel: 10,
    });
  }
  const Inputchange = (event) => {
    setValidated(false);
    const { name, value } = event.target;
    if (name === "adminLevel") {
      if (value <= 10 && value % 1 === 0 && value !== 0) {
        setstate({
          ...state,
          [name]: value,
        });
      }
    } else
      setstate({
        ...state,
        [name]: value,
      });
  };

  async function submitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setDisabled(true);
      openMessage(messageApi, "Sending...");
      const { data } = await axios.post("/api/employeeRegisterEmail", {
        state: state,
      });
      //   console.log(data);
      //   console.log(state);
      if (data.success) {
        closeMessage(messageApi, data.message, "success");
        setValidated(false);
        clear();
      } else {
        closeMessage(messageApi, data.message, "error");
        setValidated(true);
        // setisValid(false);
      }
      // console.log(data);
      setDisabled(false);
    }

    // const { data } = await axios.post("/api/find/user", {
    //   email: state.email,
    //   password: state.password,
    // });

    // console.log(data);
  }

  const handleKeyDown = (event) => {
    // Check if the pressed key is a dot (.)
    if (
      event.key === "." ||
      event.key === "-" ||
      event.key.toLowerCase() === "e" ||
      (state.adminLevel === "" && event.key === "0")
    ) {
      event.preventDefault(); // Prevent the dot from being entered
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitHandler}>
      {/* <small id="emailHelp" class="form-text text-muted mb-3">
        Link generated can be used only once.
      </small> */}
      <Card>
        {/* <CardHeader subheader="Update password" title="Password" />
        <h5>Register</h5> */}
        <Divider />
        <CardContent>
          <Stack spacing={3}>
            {/* <Form noValidate validated={validated} onSubmit={submitHandler}> */}
            <Row>
              {/* <Form.Group
                className="mb-3"
                as={Col}
                md="4"
                controlId="validationCustom01"
              > */}
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formGridAddress2"
              >
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={Inputchange}
                  placeholder="Enter Email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Valid Email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formGridState"
              >
                <Form.Label>Job Type</Form.Label>
                <Form.Select
                  required
                  name="jobType"
                  value={state.jobType}
                  onChange={Inputchange}
                >
                  <option value="">Choose...</option>
                  <option value="Intern">Intern</option>
                  <option value="Permanent Employee">Permanent Employee</option>
                  <option value="Part time Employee">Part time Employee</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select a valid Job Type.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formGridAddress2"
              >
                <Form.Label>Enter the Post of Employee/Intern *</Form.Label>
                <Form.Control
                  type="text"
                  name="post"
                  value={state.post}
                  onChange={Inputchange}
                  placeholder="Enter Post"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter post.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formGridAddress2"
              >
                <Form.Label>
                  Select the Joining Date of Employee/Intern *
                </Form.Label>
                <Form.Control
                  type="date"
                  name="joiningDate"
                  value={state.joiningDate}
                  onChange={Inputchange}
                  placeholder="select joining date"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose Joining Date.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formGridAddress2"
              >
                <Form.Label>
                  Enter Admin Level [min-1 (super Admin),max-10 (Not Admin)] *
                </Form.Label>
                <Form.Control
                  type="number"
                  name="adminLevel"
                  min="1"
                  max="10"
                  value={state.adminLevel}
                  onChange={Inputchange}
                  onKeyDown={handleKeyDown}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter valid admin Level between 1-10 (Both Inclusive).
                  <br /> 1- Super Admin
                  <br /> 10- Not Admin
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback> */}
            {/* <Button disabled={disabled} type="submit">
              Send Email
            </Button> */}
            {/* <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button> */}
            {/* </Form> */}
            {/* <TextField
                fullWidth
                label="email"
                name="email"
                required
                onChange={handleChange}
                type="text"
                helperText="Incorrect entry."
                value={values.email}
              />

              <TextField
                fullWidth
                label="Password (Confirm)"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
              /> */}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button disabled={disabled} variant="contained" type="submit">
            Send Email
          </Button>
          {/* <Button variant="contained" type="submit">
            Update
          </Button> */}
        </CardActions>
      </Card>
    </Form>
  );
};
