import React, { useContext, useState } from "react";
import ReactCardFlip from "react-card-flip";
import BlogFront from "./blogFront";
import BlogBack from "./blogBack";
import axios from "axios";
import { useSession } from "next-auth/react";
import { closeMessage, openMessage } from "../functions/message";
import { MyContext } from "../context";

const NewBlogs = ({ data, setBlogs, blogs, component = null }) => {
  const { messageApi } = useContext(MyContext);
  const [flip, setFlip] = useState(false);
  const [disable, setDisable] = useState(false);
  const { data: session } = useSession();
  async function action(status) {
    setDisable(true);
    openMessage(messageApi, "Processing please wait...");
    const { data: res } = await axios.post("/api/blogs/action", {
      id: [data.id],
      status: status,
      blog: data,
      adminName: session && session.user.name,
    });
    setDisable(false);
    if (res && res.status === 200) {
      closeMessage(messageApi, res.msg, "success");

      if (component && component === "allBlogs") {
        const updatedData = blogs.map((blog) =>
          blog.id === data.id ? res.data : blog
        );
        setBlogs(updatedData);
      } else setBlogs(blogs.filter((bl) => bl.id !== data.id));

      // setBlogs(blogs.filter((bl) => bl.id !== data.id));
    } else {
      closeMessage(messageApi, data.msg, "error");
    }
  }
  return (
    <div>
      <ReactCardFlip isFlipped={flip} flipDirection="vertical">
        <div>
          <BlogFront setFlip={setFlip} flip={flip} data={data} />
        </div>
        <div>
          <BlogBack
            setFlip={setFlip}
            disable={disable}
            action={action}
            flip={flip}
            data={data}
          />
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default NewBlogs;
