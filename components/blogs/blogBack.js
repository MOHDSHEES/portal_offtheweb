import { Button } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";

const BlogBack = ({ data, setFlip, flip, action, disable }) => {
  let activationRequest = false;
  let date = null;
  if (
    (data &&
      data.activationRequest &&
      data.activationRequest.slice(-1) === "1") ||
    data.activationRequest.slice(-1) === "0"
  ) {
    activationRequest = data.activationRequest.slice(-1) === "1" ? true : false;
    if (data.activationRequest.slice(-1) === "1") {
      date = data.activationRequest.slice(4, 24);
    }
  } else {
    activationRequest =
      data && data.activationRequet && data.activationRequest === "true"
        ? true
        : false;
  }

  return (
    <div
      //   key={idx}
      // onClick={() => jobDescription(data)}
      class="card categories-card  job-cards"
      style={{
        padding: 0,
        margin: "10px 0",
        borderRight: `4px solid ${activationRequest ? "green" : "red"}`,
      }}
    >
      <div class="card-body" onClick={() => setFlip(!flip)}>
        <small
          style={{
            float: "right",
            color: `${data.status === "Active" ? "green" : "red"}`,
          }}
        >
          {data.status}
        </small>
        <div className="job-title">
          <img class="card-img-top" loading="lazy" src={data && data.mainImg} />
          <h5 class="card-title">{data && data.title}</h5>
        </div>
        <div className="d-flex flex-wrap">
          <small className="allblogs-flex-item">
            <span style={{ fontWeight: 500 }}>Status:</span>{" "}
            <span
              style={{
                color: data.status === "Active" ? "green" : "red",
              }}
            >
              {data.status}
            </span>
          </small>
          <small className="allblogs-flex-item">
            <span style={{ fontWeight: 500 }}>Last Updated on:</span>{" "}
            {data.updatedDate ? data.updatedDate : "Not updated"}
          </small>
          <small className="allblogs-flex-item">
            <span style={{ fontWeight: 500 }}>Activation Request:</span>{" "}
            <span
              style={{
                color: activationRequest ? "green" : "red",
              }}
            >
              {activationRequest ? "Sent" : "Not Sent"}
            </span>
          </small>
          <small className="allblogs-flex-item">
            <span style={{ fontWeight: 500 }}>Request Date:</span>{" "}
            {date ? date : "No data Available"}
          </small>

          <small className="allblogs-flex-item">
            <span style={{ fontWeight: 500 }}>Activated By:</span>{" "}
            {data.status === "Active"
              ? data.activationDetails
                ? data.activationDetails.activatedBy
                : "No data Available"
              : "Not Activated"}
          </small>
          <small className="allblogs-flex-item">
            <span style={{ fontWeight: 500 }}>Activation Date:</span>{" "}
            {data.status === "Active"
              ? data.activationDetails
                ? data.activationDetails.activatedDate.slice(4, 24)
                : "No data Available"
              : "Not Activated"}
          </small>
        </div>
      </div>

      <div className="allblogs-flex-item-last">
        <Dropdown className="action-btn" drop="up">
          <Dropdown.Toggle
            className="apply-now-btn"
            variant="success"
            id="dropdown-basic"
            disabled={disable}
          >
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => action("Active")}>
              Activate
            </Dropdown.Item>
            <Dropdown.Item>Reject</Dropdown.Item>
            {/* <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          className="apply-now-btn"
          sx={{
            marginRight: "10px",
            position: "sticky",
            padding: " 10px 15px",
          }}
          variant="outlined"
          href={
            "https://www.offtheweb.in/blogs/preview/" +
            data.title.toLowerCase().replace(/ /g, "-").replace(/\?/g, "") +
            "-" +
            data.id
          }
          rel="noreferrer"
          target="_blank"
        >
          preview
        </Button>
        {/* <a
          href={
            "https://www.offtheweb.in/blogs/preview/" +
            data.title.toLowerCase().replace(/ /g, "-").replace(/\?/g, "") +
            "-" +
            data.id
          }
          rel="noreferrer"
          target="_blank"
          style={{
            // zIndex: "900px",
            marginRight: "10px",
            // float: "right",
            color: "green",
          }}
        >
          preview
        </a> */}
      </div>
    </div>
  );
};

export default BlogBack;
