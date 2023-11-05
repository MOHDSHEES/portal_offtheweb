import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import parse from "html-react-parser";
// import { useRouter } from "next/router";
// import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import BackdropComponent from "../UI-component/backdrop";
import { closeMessage, openMessage } from "../functions/message";
import { MyContext } from "../context";
import RejectMessage from "./rejectMessage";

function JobDescription({ show, setShow, data, loading, setJobs, jobs }) {
  const { messageApi } = useContext(MyContext);
  const [disabled, setDisabled] = useState(false);
  const [reason, setReason] = useState(null);
  const [rejectModalShow, setRejectModalShow] = useState(false);
  //   const [show, setShow] = useState(false);
  // const router = useRouter();
  // useEffect(() => {
  //   router.beforePopState(({ as }) => {
  //     if (as !== router.asPath) {
  //       // console.log("in");
  //       setShow(false);
  //       // Will run when leaving the current page; on back/forward actions
  //       // Add your logic here, like toggling the modal state
  //     }
  //     return true;
  //   });

  //   return () => {
  //     router.beforePopState(() => true);
  //   };
  // }, [router]);
  async function activate() {
    if (data && data._id) {
      setDisabled(true);
      const id = data._id;
      const { data: res } = await axios.post("/api/action/Active", { id: id });
      // setOpen(false);
      setDisabled(false);
      close();
      if (res.status === 200) {
        closeMessage(messageApi, "Activated Sucessfully", "success");
        setJobs(jobs.filter((job) => job._id !== data._id));
        await axios.post("https://backup-mohdshees.vercel.app/job-activated", {
          token: "axzis925klg029",
          id: data._id,
          title: data.jobTitle,
          userId: data.postedBy,
        });
      } else closeMessage(messageApi, res.err, "error");
    }
  }

  async function reject(e) {
    e.preventDefault();
    if (data && data._id && reason.trim().length !== 0) {
      setDisabled(true);
      const id = data._id;
      const { data: res } = await axios.post("/api/action/Rejected", {
        id: id,
        message: reason,
      });
      // setOpen(false);
      setDisabled(false);
      setRejectModalShow(false);
      if (res.status === 200) {
        closeMessage(messageApi, "Rejected Sucessfully", "success");
        setJobs(jobs.filter((job) => job._id !== data._id));
        close();
        // await axios.post("https://backup-mohdshees.vercel.app/job-activated", {
        //   token: "axzis925klg029",
        //   id: data._id,
        //   title: data.jobTitle,
        //   userId: data.postedBy,
        // });
      } else closeMessage(messageApi, res.err, "error");
    }
  }

  function close() {
    // router.replace(url, undefined, { shallow: true });
    setShow(false);
  }

  // function edit() {
  //   router.push({
  //     pathname: "/post",
  //     query: { job: data._id },
  //   });
  // }
  return (
    <>
      {/* <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button> */}

      <Modal
        show={show}
        onHide={close}
        size="xl"
        centered
        backdrop="static"
        // dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {loading ? "Loading" : data && data.jobTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: "20px" }}>
          {data && data.status === "Rejected" && data.message && (
            <div class="alert alert-danger" role="alert">
              <h4 class="alert-heading">Oops! Job got Rejected.</h4>
              <p>
                <strong>Reason:</strong> {data.message}
              </p>
              <p className="mb-0">
                Make sure all the specified criteria are met before trying to
                submit your application again.
              </p>
              <hr />

              <p style={{ color: "#58151c" }} className="mb-0">
                If you have any questions or require additional assistance,
                please do not hesitate to{" "}
                <a href="https://www.offtheweb.in/contact" class="alert-link">
                  contact us.
                </a>
              </p>
            </div>
          )}

          {loading ? (
            <div className="d-flex  align-items-center">
              Fetching data, Please wait
              {/* <ThreeDots
                height="10"
                width="80"
                radius="1"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              /> */}
            </div>
          ) : (
            data && (
              <>
                <p style={{ textAlign: "center" }}>
                  <img
                    class="card-img-top"
                    style={{ width: "80px" }}
                    loading="lazy"
                    src={data.logo}
                  />
                </p>
                <p>
                  <b>About</b>
                  <br />
                  <p class="card-title">{data.about}</p>
                </p>
                <Table striped bordered className="job-table">
                  <tbody>
                    <tr>
                      <th>Company</th>
                      <td>{data.companyName}</td>
                    </tr>
                    <tr>
                      <th>website</th>
                      <td>
                        <a
                          href={data.website}
                          style={{ wordBreak: "break-all" }}
                          target="_blank"
                        >
                          {data.website}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>Location</th>
                      <td>{data.location}</td>
                    </tr>
                    <tr>
                      <th>Experience</th>
                      <td>{data.experience}</td>
                    </tr>
                    <tr>
                      <th>Salary</th>
                      <td>{data.salary}</td>
                    </tr>
                    <tr>
                      <th>Last date</th>
                      <td>{data.lastDate === "" ? "ASAP" : data.lastDate}</td>
                    </tr>
                  </tbody>
                </Table>
                <p>
                  <b>Job Summary</b>
                  <br />
                  {data.jobSummary}
                </p>
                <p className="job-additional">{parse(data.additional)}</p>
                <Button
                  onClick={close}
                  style={{ marginLeft: "10px" }}
                  // href={data.applyLink}
                  // target="_blank"
                  className="apply-now-btn secondary-1"
                  variant="secondary"
                >
                  Close
                </Button>
                <Dropdown className="action-btn" drop="up">
                  <Dropdown.Toggle
                    className="apply-now-btn"
                    variant="success"
                    id="dropdown-basic"
                    disabled={disabled}
                  >
                    Action
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={activate}>Activate</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRejectModalShow(true)}>
                      Reject
                    </Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )
          )}
        </Modal.Body>
      </Modal>
      <RejectMessage
        reason={reason}
        reject={reject}
        setReason={setReason}
        show={rejectModalShow}
        onHide={() => setRejectModalShow(false)}
      />
    </>
  );
}

export default JobDescription;
