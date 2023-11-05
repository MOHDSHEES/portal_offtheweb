import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBriefcase,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const BlogFront = ({ data, setFlip, flip }) => {
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
      onClick={() => setFlip(!flip)}
      class="card categories-card  job-cards"
      style={{
        padding: 0,
        margin: "10px 0",
        borderRight: `4px solid ${activationRequest ? "green" : "red"}`,
      }}
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
          <img class="card-img-top" loading="lazy" src={data && data.mainImg} />
          <h5 class="card-title">{data && data.title}</h5>
        </div>
        <div className=" break-line-2">{data.description}</div>
      </div>
    </div>
  );
};

export default BlogFront;
