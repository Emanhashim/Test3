import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../FontawsomeIcons";
import scrollreveal from "scrollreveal";
import { Form, Button } from "semantic-ui-react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import "./Form1.css";

import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Signup = () => {
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleClick();
  };
  const passwordx = useRef({});
  passwordx.current = watch("passwordx", "");

  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
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
  }, []);

  const history = useHistory();

  const login = () => {
    history.push("/ver");
  };
  const [agree, setAgree] = useState(false);
  const [firstName, setFirst_Name] = useState("");
  const [lastName, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setRe_password] = useState("");
  const [country, setCountry] = useState("");
  const [birthDay, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState();
  const [app_user, setApp_user] = useState([]);
  const [username, setUsername] = useState("");
  console.log(gender);
  console.log(firstName);
  const handleClick = (e) => {
    signupxx();

    const checkboxHandler = () => {
      // if agree === true, it will be set to false
      // if agree === false, it will be set to true
      // Don't miss the exclamation mark
    };
    async function signupxx() {
      console.warn(username.password);
      const userinfo = {
        birthDay,
        confirmPassword,
        country,
        email,
        firstName,
        gender,
        lastName,
        password,
        username,
      };

      let item = {
        birthDay,
        confirmPassword,
        country,
        email,
        firstName,
        gender,
        lastName,
        password,
        username,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      };
      const url = "http://localhost:8080/Api/SignUp/User";
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        localStorage.setItem("message", JSON.stringify(result["message"]));
        const mess = localStorage.getItem("message");
        console.log(mess);
        if (response.ok) {
          console.log("Signup successful");
          swal("Successful", "Welcom", "success", {
            buttons: false,
            timer: 2000,
          });
          history.push("/home1");
        } else {
          console.log("failed");
          swal(`Failed To Signup ${mess}`, "Error", "error");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div className="form-containerxx">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inputs">
            <label className="form-labelx">Phone Numer</label>

            <PhoneInput
              international
              countryCallingCodeEditable={true}
              placeholder="Enter your Phone Number"
              type="text"
              name="phonex"
              value={username}
              {...register("phonex", {
                required: {
                  value: true,
                  message: "Please Enter your Phone number",
                },
                minLength: {
                  value: 10,
                  message: " must have at least 10 characters",
                },
              })}
              onChange={setUsername}
            />

            {errors.phonex && <p>{errors.phonex.message}</p>}
          </div>

          <div className="form-inputs">
            {/* country */}
            <FontAwesomeIcon icon="globe" className="fa" />
            <label className="form-labelx">Country List</label>
            <input
              className="form-input"
              type="text"
              name="first_name"
              placeholder="Enter your Country"
              {...register("countryx", {
                required: {
                  value: true,
                  maxLength: 30,
                  message: "Please Enter Country",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Only Letters",
                },
              })}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />{" "}
            {errors.countryx && <p>{errors.countryx.message}</p>}
          </div>

          <div className="form-inputsx">
            <FontAwesomeIcon icon="user" className="fa" />
            <label className="form-labelx">First Name</label>

            <input
              className="form-input"
              type="text"
              name="first_name"
              placeholder="Enter your First name"
              value={firstName}
              {...register("First", {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Only Letters",
                },

                pattern: {
                  value: /^[A-Z][a-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/,
                  message: "start with uppercase",
                },
                minLength: {
                  value: 2,
                  message: " must have at least 2 characters",
                },
              })}
              onChange={(e) => setFirst_Name(e.target.value)}
            />
            {errors.First && <p>{errors.First.message}</p>}
          </div>

          <div className="form-inputs">
            <FontAwesomeIcon icon="user" className="fa" />
            <label className="form-labelx">Last Name</label>

            <input
              className="form-input"
              type="text"
              name="last_name"
              placeholder="Enter your Last name"
              value={lastName}
              {...register("Last", {
                required: {
                  value: true,
                  message: "Please enter your Last Name",
                },
                minLength: {
                  value: 2,
                  message: " must have at least 2 characters",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Only Letters",
                },

                pattern: {
                  value: /^[A-Z][a-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/,
                  message: "start with uppercase",
                },
              })}
              onChange={(e) => setLast_Name(e.target.value)}
            />
            {errors.Last && <p>{errors.Last.message}</p>}
          </div>
          <div className="form-inputs">
            <FontAwesomeIcon icon="envelope" className="fa" />
            <label className="form-labelx">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter your email address",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-inputs">
            <span className="form-input-icon">
              <FontAwesomeIcon icon="calendar" className="fa" />
            </span>

            <label className="form-labelx">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              className="form-input"
              placeholder="Enter BirthDate"
              value={birthDay}
              {...register("birthdate", { required: true, maxLength: 30 })}
              onChange={(e) => setBirth(e.target.value)}
            />
            {errors.birthdate && <p>BirthDate is Required</p>}
          </div>

          <div className="form-inputs">
            <FontAwesomeIcon icon="user" className="fa" />
            <label className="form-labelx">Gender</label>
            <select
              className="form-input"
              onChange={(e) => setGender(e.target.value)}
            >
              {" "}
              Gender
              <option className="form-input" value={"MALE"}></option>
              <option className="form-input" value={"MALE"}>
                MALE
              </option>
              <option className="form-input" value={"FEMALE"}>
                FEMALE
              </option>
            </select>

            {errors.gender && <p>Gender is Required</p>}
          </div>

          <div className="form-inputs">
            <FontAwesomeIcon icon="lock" className="fa" />
            <label className="form-labelx">Password</label>
            <input
              className="form-input"
              name="passwordx"
              placeholder="Enter your Password"
              type={passwordShown ? "text" : "password"}
              {...register("passwordx", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "must have at least one uppercase letter, one lowercase letter and one number ",
                },
              })}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i onClick={togglePasswordVisiblity}>{eye}</i>
            {errors.passwordx && <p>{errors.passwordx.message}</p>}
          </div>

          <div className="form-inputs">
            <FontAwesomeIcon icon="lock" className="fa" />
            <label className="form-labelx">Confirm Password</label>
            <input
              placeholder="Confirm your Password"
              className="form-input"
              name="password_repeat"
              type={passwordShown ? "text" : "password"}
              {...register("password_repeat", {
                validate: (value) =>
                  value === passwordx.current || "The passwords do not match",
              })}
              onChange={(e) => setRe_password(e.target.value)}
            />
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          </div>

          <Button className="form-input-btncc">Sign up</Button>
          <span className="form-input-login">
            Already have an account? Login <a href="/login">here</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
