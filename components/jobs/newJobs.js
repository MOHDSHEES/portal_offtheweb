import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBriefcase,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const NewJobs = ({ data }) => {
  return (
    <div
      //   key={idx}
      // onClick={() => jobDescription(data)}
      class="card categories-card  job-cards"
      style={{ padding: 0, margin: "10px 0" }}
    >
      <div class="card-body">
        <small
          style={{
            float: "right",
            color: `${data.status === "Active" ? "green" : "red"}`,
          }}
        >
          {data.status}
        </small>
        <div className="job-title">
          <img class="card-img-top" loading="lazy" src={data.logo} />
          <h5 class="card-title">
            {data && data.jobTitle && data.jobTitle.length <= 120
              ? data.jobTitle + " | " + data.companyName
              : data.jobTitle}
          </h5>
        </div>
        <div className="job-meta ">
          <small>
            <b>
              <FontAwesomeIcon icon={faLocationDot} />
            </b>
            {data.location}
          </small>

          <small>
            <b>
              <FontAwesomeIcon icon={faBriefcase} />
            </b>{" "}
            {data.experience}
          </small>
          <small>
            <b>
              <FontAwesomeIcon icon={faClock} />
            </b>{" "}
            {data.lastDate === "" ? "ASAP" : data.lastDate}
          </small>
        </div>

        {/* <p class="card-text break-line-3 mt-2" style={{ lineHeight: "25px" }}>
          {data.jobSummary}
        </p> */}
      </div>
    </div>
  );
};

export default NewJobs;
