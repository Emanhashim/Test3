import React from "react";
import { useForm } from "react-hook-form";

export default function Personal(props) {
  const { register, handleSubmit, watch,formState: { errors } } = useForm();
    const onSubmit = (data) => {
       next(data);
        console.log(data);
      
   
       }
  const next = (e) => {
   
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const { values, handleChange } = props;
  return (
    <>
      <h1>Enter personal details</h1>
     <form >
      <div className="input-field">
        <label htmlFor="firstName">First name</label>
        <input
          defaultValue={values.firstName}
          {...register("firstName", {
            required: {
              value: true,
              message: "Please enter your First Name",
            },
            pattern: {
              value:
              /[A-Za-z]+$/,
              message: "Only Letters",
            },
            
            pattern: {
              value:
              /^[A-Z][a-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/,
              message: "start with uppercase",
            },
            minLength: {
              value: 2,
              message: " must have at least 2 characters"
                  },
                  maxLength: {
                    value: 10,
                    message: " must not be greater than at 10 character"
                        },
          })}
          type="text"
          id="firstName"
          onChange={handleChange("firstName")}
        
        />
      {errors.firstName && <p className="text-error">{errors.firstName.message}</p>}
      </div>
      <div className="input-field">
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          onChange={handleChange("lastName")}
          defaultValue={values.lastName}
        />
      </div>
      <div className="input-field">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          onChange={handleChange("age")}
          defaultValue={values.age}
        />
      </div>
      <div>
        <button className="btn" onClick={back}>
          Back
        </button>
        <button className="btn" onClick={ handleSubmit(onSubmit) } >
          Next
        </button>
        
      </div>
      </form>
    </>
  );
}
