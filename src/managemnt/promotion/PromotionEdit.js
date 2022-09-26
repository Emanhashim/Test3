import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BsFillImageFill} from "react-icons/bs";
import {ImWarning} from "react-icons/im";

import swal from 'sweetalert';
const PromoEdit = () => {
    const message =JSON.parse(localStorage.getItem('message'));
  const jwt =JSON.parse(localStorage.getItem('jwt'));

  let history = useHistory();
  const { id } = useParams();
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate ,setExpirationDate]= useState("")
   const [status , setStatus]=useState("")
  const [imgData, setImgData] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    if(e.target.files.length > 0){
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const [user, setUser] = useState({
    title: "",
    description: "",
    expirationDate: "",
    picture: "",
   
  });
  const [selectedFile, setSelectedFile] = useState();
  const { firstName, username, businessLNum, lastName, companyName, licenceNumber,woreda,password} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);
console.log(selectedFile)
  const onSubmit= async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description);
    formData.append("expirationDate", expirationDate);
    formData.append("picture", picture);
    formData.append("file", selectedFile);
    formData.append("status",status);

   console.log(status)
   await axios.put(`http://198.199.67.201:8080/Api/Promotion/UpdatePromotion/${id}`,formData, {
        headers: {
          'Content-Type':'Auto',
          "Authorization":`Bearer ${jwt}`,
        }})
      .then((res) => {
        localStorage.setItem('message', JSON.stringify(res.data.message))
        const mess= localStorage.getItem('message')
        console.log(mess)
        swal("Successfully Updated", "success", {
          buttons: false,
          timer: 3000,
        })
        console.log(res)
        history.push("/PromoView");
      })
      .catch((err) =>  swal(`${message}`,"Error", "error",  {
        buttons: false,
        timer: 3000,
      }));
   
  };
 
  const loadUser = async () => {
    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description);
    formData.append("expirationDate", expirationDate);
    formData.append("picture", picture);
    formData.append("status",status);
    formData.append("file", selectedFile);
    console.log(description)
   const result = await axios.get(`http://198.199.67.201:8080/Api/Promotion/All/${id}`,formData,{ headers: {
    'Content-Type':'application/json',
          "Accept":"application/json",
          "Authorization":`Bearer ${jwt}`
  }});
  setUser(result.data)
     console.log(result.data.title)
     console.log(title)
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Promo Id: {id}</h2>
        <form onSubmit={e => onSubmit(e)}>
        <FontAwesomeIcon icon="user" className="fa" />
        <label>Title</label> 
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Title"
            
              value={title}
              onChange={(e) =>setTitle(e.target.value)} 
            />
          </div>
          <FontAwesomeIcon icon="envelope" className="fa" />
          <label>Description</label> 
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Description"
       
              value={description}
              onChange={(e) =>setDescription(e.target.value)} 
            />
            
          </div>
          <BsFillImageFill style={{ color: "#ffc107" , padding:"1px", fontSize: "1.3rem"}}/>
          <label>Picture</label> 
          <div className="form-group">
              
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Enter Your businessLNum"
            
           
              onChange={handleFileChange} 
            />
          </div>
          <FontAwesomeIcon icon="lock" className="fa" />
          <label>Expiration Date</label>  
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Expiration Date"
              name="username"
              value={expirationDate}
              onChange={(e) =>setExpirationDate(e.target.value)} 
            />
          </div>
          <ImWarning style={{ color: "#ffc107", padding:"1px", fontSize: "1.3rem" }}/>
          <label>Status</label>
          <div className="form-group">
          <select   className="form-control form-control-lg" onChange={(e) => setStatus(e.target.value)} >
            <option  className="form-input" value={""} ></option>
            <option  className="form-input" value={"TRUE"} >Active</option>
            <option  className="form-input" value={"FALSE"} >Deactivate</option>
           
            </select> 
          </div>
      
         
         <h1>.</h1>
          <button className="btn btn-warning btn-block">Update Promotion</button>
        </form>
      </div>
    </div>
  );
};

export default PromoEdit;
