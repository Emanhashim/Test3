import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import "../FontawsomeIcons";
import scrollreveal from "scrollreveal";
import { Form, Button } from "semantic-ui-react";
import "./Form.css";
import swal from "sweetalert";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";

import { FiMail } from "react-icons/fi";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components1/merchant/Loading";
const eye = <FontAwesomeIcon icon={faEye} />;
const Person = <FontAwesomeIcon icon={faPerson} />;
const LoginMA = () => {
  const[loading , setLoading]=useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  }; // tp hide and show password of the admin
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    login();
  };
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .form-container 
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []); // sliding effect

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
    }  setUsername("")
  }, []);



  
     
  async function login() {
    const users = { username, password };
     console.log(username)
    let item = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(item),
    };
   
    const url = "http://198.199.67.201:8080/Api/SignIn/Admin";
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      localStorage.setItem("user", JSON.stringify(result["user"]));

      const user = localStorage.getItem("user");
      console.log(user);

      localStorage.setItem("user", JSON.stringify(users));

      if (response.ok) {
        setLoading(true)
        console.log("Login successful");
        swal("Successful", "Welcome To Admin DashBoard", "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
        
          localStorage.setItem("user", JSON.stringify(result["user"]));
          localStorage.getItem("user");
          localStorage.setItem("jwt", JSON.stringify(result["jwt"]));
          localStorage.getItem("jwt");
          window.location.href = "/dashboard";
        }).finally(()=>{
          setLoading(false)
        });
      } else {
        setLoading(false)
        console.log("failed");
        swal("Failed", "Wrong Password or Email Address", "error");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Calling Admin login API

  if (loading){
    return <Loading/>
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
          <div class="ribbon ribbon-top-left">
            <span style={{ fontSize: "14px" }}> Admin Login</span>
          </div>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2></h2>
            <div className="form-inputsx">
              <Form.Field>
                <FontAwesomeIcon
                  icon="user"
                  style={{
                    color: "#ffc107",
                    fontSize: "15px",
                    position: "2px",
                  }}
                />

                <label className="form-label">Phone Number</label>
                <input
                  className="form-inputAD"
                  type="username"
                  name="username"
                  placeholder="Enter Your Phone Number"
                  {...register("user", { required: true, maxLength: 30 })}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.user && (
                  <p className="text-error">User Name Required</p>
                )}
              </Form.Field>

              <Form.Field>
                <FontAwesomeIcon
                  icon="lock"
                  style={{
                    color: "#ffc107",
                    fontSize: "15px",
                    position: "2px",
                  }}
                />

                <label className="form-label">Password</label>
                
                <input
                  className="form-inputAD"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  {...register("pass", { required: true, maxLength: 30 })}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i onClick={togglePasswordVisiblity}>{eye}</i>

                <span className="form-input-login1"></span>

                {errors.pass && <p className="text-error">Password Required</p>}
              </Form.Field>
            </div>
            <div className="form-inputs"></div>
            <button
              className="form-inputAD-btnx"
              type="sumbit"
              style={{ fontSize: "15px", color: "#fff" }}
            >
              Login
            </button>

            <span className="form-input-login"></span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginMA;
