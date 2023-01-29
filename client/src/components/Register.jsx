import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/AuthAction";
import { useAlert } from "react-alert";

const Register = () => {
  const alert = useAlert();
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  console.log("myInfo===>", myInfo);

  const dispatch = useDispatch();
  const [loadImage, setLoadImage] = useState("");
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const fileHandle = (e) => {
    if (e.target.files.lenght !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
      console.log("daf");
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const register = (e) => {
    const { userName, email, password, confirmPassword, image } = state;
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    dispatch(userRegister(formData));
  };
  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
          <div className="card-body">
            <form onSubmit={register}>
              <div className="form-group">
                <label htmlFor="username">user Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="user name"
                  id="username"
                  name="userName"
                  value={state.userName}
                  onChange={inputHandle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="enter email"
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={inputHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="password"
                  name="password"
                  value={state.password}
                  onChange={inputHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirem password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={state.confirmPassword}
                  onChange={inputHandle}
                />
              </div>

              <div className="form-group">
                <div className="file-image">
                  <div className="image">
                    {loadImage ? <img src={loadImage} alt="profile" /> : ""}
                  </div>
                  <div className="file">
                    <label htmlFor="image">Select Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="form-control"
                      onChange={fileHandle}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input type="submit" value="register" className="btn" />
              </div>
              <div className="form-group">
                <span>
                  <Link to="/messenger/login"> Login Your Account</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
