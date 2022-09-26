import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
const SecurityEdit = () => {
    const message =JSON.parse(localStorage.getItem('message'));
    console.log(message)
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
   question: "",
   
  });

  const {question,} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://198.199.67.201:8080/Api/Question/UpdateQuestion/${id}`, user,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).then((res) => {
        localStorage.setItem('message', JSON.stringify(res.data.message))
        const mess= localStorage.getItem('message')
        console.log(mess)
        swal("Successfully Updated", "success", {
          buttons: false,
          timer: 3000,
        })
        console.log(res)
        history.push("/SecurityV");
      })
      .catch((err) =>  swal(`${message}`,"Error", "error", {
        buttons: false,
        timer: 5000,
      }));;
  
  };

  const loadUser = async () => {
    const result = await axios.get(`http://198.199.67.201:8080/Api/Accounts/Merchant/${id}`,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }});
    setUser(result.data);
    console.log(result)
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
          
        <h2 className="text-center mb-4">     <FontAwesomeIcon icon="lock" className="fa" />Edit Security Question Id: {id}</h2>
        <form onSubmit={e => onSubmit(e)}>
        <FontAwesomeIcon icon="globe" className="fa" />
        <label>Security Question </label> 

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Security Question"
              name="question"
              value={question}
              onChange={e => onInputChange(e)}
            />

          </div>
       
         

        <h1>.</h1>
          <button className="btn btn-warning btn-block">Update Security Question</button>
        </form>
      </div>
    </div>
  );
};

export default SecurityEdit;
