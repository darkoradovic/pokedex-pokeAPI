import Button from "@mui/material/Button";
import * as C from "./styles";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "../../api/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<any>("");
  const [file, setFile] = useState<any>("");
  const [birthday, setBirthday] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    const fileSize = event.target.files[0].size / 1024 / 1024;
    if (fileSize > 1) {
      toast.error("File size exceeds 1MB", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const base64 = await convertBase64(file);
      setAvatar(base64);
      setFile(base64);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user?.name);
    setEmail(user?.email);
    setAvatar(user?.avatar);
    setBirthday(user?.birthday);
    localStorage.setItem("prevUser", JSON.stringify(user));
  }, []);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUpdate = () => {
    updateProfile(email, name, email, avatar, birthday, setUpdating);
    const data = {
      email,
      name,
      avatar,
      birthday,
    };
    localStorage.setItem("user", JSON.stringify(data));
  };

  const cancelChange = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user?.name);
    setEmail(user?.email);
    setAvatar(user?.avatar);
    setBirthday(user?.birthday);
  };

  useEffect(() => {
    const checkForChanges = () => {
      const user = JSON.parse(localStorage.getItem("prevUser"));
      if (
        user.name !== name ||
        user.email !== email ||
        user.birthday !== birthday ||
        (file !== "" && user.avatar !== file)
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    checkForChanges();
  }, [name, email, avatar, birthday]);

  return (
    <C.Container>
      <div className="container-fluid main">
        <div className="d-block d-md-none menu">
          <div className="bar"></div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-9">
            <div className="container content clear-fix">
              <h2 className="mt-5 mb-5">Profile Settings</h2>

              <div className="row">
                <div className="col-md-3">
                  <div className="d-inline">
                    <div className="avatar-upload">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) => handleChange(e)}
                        />

                        <label htmlFor="imageUpload"></label>
                      </div>
                      <img src={avatar} />
                      <div className="avatar-preview">
                        <div id="imagePreview"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="container">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        autoComplete="off"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        disabled
                        type="email"
                        className="form-control"
                        id="email"
                        autoComplete="off"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group ">
                      <label htmlFor="birthday">Birthday</label>
                      <input
                        type="date"
                        className="form-control"
                        id="birthday"
                        defaultValue={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </div>

                    <div className="row mt-5">
                      <div className="col">
                        <Button
                          disabled={disabled}
                          variant="outlined"
                          className="save"
                          onClick={() => handleUpdate()}
                        >
                          {updating ? "Updating profile" : "Save Changes"}
                        </Button>
                      </div>

                      <div className="col">
                        <Button
                          variant="outlined"
                          color="error"
                          className="save"
                          onClick={() => cancelChange()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </C.Container>
  );
};
