import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import states from "../functions/states";
// import { useNavigate, useParams } from "react-router-dom";
import { closeMessage } from "../functions/message";
import { message } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Otp from "../functions/otp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackdropComponent from "../UI-component/backdrop";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [passEye, setPassEye] = useState(false);
  const [confirmPassEye, setConfirmPassEye] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();
  const [disable, setdisable] = useState(true);
  // boolean hook (true if email is verified)
  const [isVerified, setisVerified] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setstate] = useState({
    name: "",
    email: "",
    companyName: "",
    password: "",
    address: "",
  });
  const router = useRouter();
  const { messageApi } = useContext(MyContext);

  function clear() {
    setstate({
      name: "",
      email: "",
      companyName: "",
      password: "",
    });
  }

  const Inputchange = (event) => {
    const { name, value } = event.target;
    setstate({
      ...state,
      [name]: value,
    });
  };
  //   console.log(state);
  async function submitHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (isVerified) {
        if (state.password === confirmPassword) {
          setOpen(true);
          setdisable(true);
          const { data: da } = await axios.post("/api/register", {
            state,
          });

          if (da && da.status === 200) {
            // console.log(da.data);
            await axios.post(
              "https://offtheweb-email.vercel.app/job/user/registered",
              {
                token: "axzis925klg029",
                to: da.data.email,
                name: da.data.name,
              }
            );
            setOpen(false);
            closeMessage(messageApi, "Successfully registered", "success", 4);
            router.replace("/login");
          } else {
            setOpen(false);
            closeMessage(
              messageApi,
              "Something went wronng, Try again later",
              "error"
            );
          }
        } else {
          closeMessage(
            messageApi,
            "Password and Confirm Password should be same",
            "error"
          );
        }
      } else {
        closeMessage(messageApi, "Verify email", "error");
      }
    }

    setValidated(true);
  }
  return (
    <div>
      {/* {contextHolder} */}
      <div>
        <section className=" gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 ">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <div style={{ textAlign: "center" }}>
                      <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                        Registration
                      </h3>
                    </div>
                    <div className="pb-3">
                      <small>
                        <b>Disclaimer:</b> Your Data security is our priority.
                        It will only be used to keep the record. We will not
                        disclose or share you data with anyone.
                      </small>
                    </div>
                    {/* <form onSubmit={submitHandler} class="row mt-3 g-3"> */}
                    <Form
                      class="row mt-3 g-3"
                      noValidate
                      validated={validated}
                      onSubmit={submitHandler}
                    >
                      <Row>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md="4"
                          controlId="validationUserName"
                        >
                          <Form.Label>Name *</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={Inputchange}
                            placeholder="Enter your Full Name"
                          />
                          <Form.Control.Feedback type="invalid">
                            Enter your Full Name
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md="4"
                          controlId="validationEmail"
                        >
                          {/* <Form.Label>Email *</Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              required
                              type="text"
                              name="email"
                              value={state.email}
                              onChange={Inputchange}
                              placeholder="Enter your email"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter your email Id
                            </Form.Control.Feedback>
                            <Button
                              variant="outline-secondary primary-1"
                              id="button-addon2"
                            >
                              Verify
                            </Button>
                          </InputGroup> */}
                          <Otp
                            disable={setdisable}
                            setstate={setstate}
                            setisVerified={setisVerified}
                            isVerified={isVerified}
                            state={state}
                            messageApi={messageApi}
                          />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          md="4"
                          className="mb-3"
                          controlId="validationCompanyUsername"
                        >
                          <Form.Label>Company Name *</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              placeholder="Enter your company Name"
                              aria-describedby="inputGroupPrepend"
                              name="companyName"
                              value={state.companyName}
                              onChange={Inputchange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Your Company Name
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          as={Col}
                          // md="4"
                          className="mb-3"
                          controlId="validationAddress"
                        >
                          <Form.Label>Address *</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              placeholder="Enter Address"
                              aria-describedby="inputGroupPrepend"
                              name="address"
                              value={state.address}
                              onChange={Inputchange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter complete Address
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md="4"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Password *</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              className="btn-eye"
                              required
                              type={`${passEye ? "text" : "password"}`}
                              name="password"
                              value={state.password}
                              onChange={Inputchange}
                              placeholder="Enter password"
                              aria-describedby="eye-1"
                            />
                            <InputGroup.Text
                              id="eye-1"
                              onClick={() => setPassEye(!passEye)}
                              style={{ background: "white", cursor: "pointer" }}
                            >
                              {passEye ? (
                                <FontAwesomeIcon icon={faEyeSlash} size="xs" />
                              ) : (
                                <FontAwesomeIcon icon={faEye} size="xs" />
                              )}
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                              Enter password
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          md="4"
                          controlId="validationCustom02"
                          aria-describedby="eye-2"
                        >
                          <Form.Label>Confirm Password *</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              required
                              className="btn-eye"
                              name="confirmPassword"
                              type={`${confirmPassEye ? "text" : "password"}`}
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                              }}
                              placeholder="Confirm Password"
                            />
                            <InputGroup.Text
                              id="eye-2"
                              onClick={() => setConfirmPassEye(!confirmPassEye)}
                              style={{ background: "white", cursor: "pointer" }}
                            >
                              {confirmPassEye ? (
                                <FontAwesomeIcon icon={faEyeSlash} size="xs" />
                              ) : (
                                <FontAwesomeIcon icon={faEye} size="xs" />
                              )}
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                              Confirm password
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Row>

                      <div class="col-2">
                        <button
                          disabled={disable}
                          type="submit"
                          class="btn btn-primary primary-1"
                        >
                          Register
                        </button>
                      </div>
                    </Form>
                    <div className="mt-4">
                      <small className="a-red ">
                        <Link href="/login">Already have an account?</Link>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BackdropComponent open={open} />
    </div>
  );
};

export default Register;
