import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { MyContext } from "../context";
import { closeMessage, openMessage } from "../functions/message";

const PhotoUpload = (props) => {
  const { messageApi, user, setUser } = useContext(MyContext);
  //   const [sign, setsign] = useState("");
  const [uploading, setuploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [img, setImg] = useState(null);
  // const [prevImg, setprevImg] = useState(user ? user.profileImg : "");

  // useEffect(() => {
  //   if (user && user.profileImg) {
  //     setprevImg(user.profileImg);
  //   }
  // }, [user]);
  const onChangePicture = async (e) => {
    if (e.target.files[0]) {
      setImgData(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "djywqdmj");
    if (img) {
      setuploading(true);
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/domyp6djh/image/upload",
          formData
        );
        if (response && response.data && response.data.url) {
          const { data } = await axios.post("/api/changeImage", {
            imgId: user && user.profileImg ? user.profileImg : null,
            data: user,
            profileImg: response.data.url,
            // data: { ...props.data, profileImg: data },
          });
          if (data.status === 200) {
            setUser({ ...user, profileImg: response.data.url });
            closeMessage(messageApi, data.msg, "success");
          } else {
            closeMessage(messageApi, data.msg, "error");
          }
        } else {
          closeMessage(
            messageApi,
            "Something went wrong.Try again later.",
            "error"
          );
        }
      } catch (error) {
        closeMessage(messageApi, error, "error");
      }
      props.onHide();
      setuploading(false);
    }
  };

  return (
    <div>
      <Modal
        // onExit={() => {
        //   clear();
        // }}
        backdrop="static"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload/Change Profile Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            {imgData && (
              <img
                src={imgData}
                className="rounded-circle img-fluid"
                alt="Profile"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            )}
          </div>
          <form onSubmit={submitHandler}>
            <div class="mb-3">
              <label class="form-label" for="customFile">
                Please choose Image to upload
              </label>
              <input
                type="file"
                onChange={onChangePicture}
                class="form-control"
                id="customFile"
              />
            </div>
            <div>
              <button
                disabled={uploading}
                type="submit"
                class="btn btn-primary"
              >
                Upload
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoUpload;
