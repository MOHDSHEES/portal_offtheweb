import React, { useContext, useState } from "react";
import ReactCardFlip from "react-card-flip";
import BlogFront from "./blogFront";
import BlogBack from "./blogBack";
import axios from "axios";
import { useSession } from "next-auth/react";
import { closeMessage, openMessage } from "../functions/message";
import { MyContext } from "../context";
import RejectMessage from "../modal/rejectMessage";

const NewBlogs = ({
  data,
  setBlogs,
  blogs,
  component = null,
  filterFunction,
}) => {
  const { messageApi, user } = useContext(MyContext);
  const [flip, setFlip] = useState(false);
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);

  async function action(status) {
    if (user && user.employeeId !== "1885816702") {
      setDisable(true);
      openMessage(messageApi, "Processing please wait...");
      const { data: res } = await axios.post("/api/blogs/action", {
        id: [data.id],
        status: status,
        blog: data,
        adminName: user && user.name,
      });
      setDisable(false);
      if (res && res.status === 200) {
        closeMessage(messageApi, res.msg, "success");

        if (component && component === "allBlogs") {
          const updatedData = blogs.map((blog) =>
            blog.id === data.id ? res.data : blog
          );
          setBlogs(updatedData);
          filterFunction(data.status);
        } else setBlogs(blogs.filter((bl) => bl.id !== data.id));

        // setBlogs(blogs.filter((bl) => bl.id !== data.id));
      } else {
        closeMessage(messageApi, data.msg, "error");
      }
    } else {
      closeMessage(
        messageApi,
        "Demo account does not support this feature",
        "info"
      );
    }
  }

  const [reason, setReason] = useState(null);

  async function reject(e) {
    e.preventDefault();
    if (user && user.employeeId !== "1885816702") {
      if (data && data._id && reason.trim().length !== 0) {
        setDisable(true);
        const id = data.id;

        const { data: res } = await axios.post("/api/blogs/actionReject", {
          id: id,
          message: reason,
          blog: data,
          adminName: user && user.name,
        });
        // setOpen(false);
        setDisable(false);
        setShow(false);
        if (res.status === 200) {
          closeMessage(messageApi, "Rejected Sucessfully", "success");
          if (component && component === "allBlogs") {
            const updatedData = blogs.map((blog) =>
              blog.id === data.id ? res.data : blog
            );
            setBlogs(updatedData);
            filterFunction(data.status);
          } else setBlogs(blogs.filter((blog) => blog.id !== data.id));
          close();
        } else closeMessage(messageApi, res.err, "error");
      }
    } else {
      closeMessage(
        messageApi,
        "Demo account does not support this feature",
        "info"
      );
    }
  }
  function close() {
    setReason("");
    // router.replace(url, undefined, { shallow: true });
    setShow(false);
  }

  return (
    <div>
      <ReactCardFlip isFlipped={flip} flipDirection="vertical">
        <div>
          <BlogFront setFlip={setFlip} flip={flip} data={data} />
        </div>
        <div>
          <BlogBack
            setShow={setShow}
            setFlip={setFlip}
            disable={disable}
            setDisable={setDisable}
            action={action}
            flip={flip}
            data={data}
          />
        </div>
      </ReactCardFlip>
      <RejectMessage
        reason={reason}
        reject={reject}
        setReason={setReason}
        show={show}
        onHide={() => setShow(false)}
      />
    </div>
  );
};

export default NewBlogs;
