import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import scrollreveal from "scrollreveal";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loading from "../../components1/merchant/Loading";
const PromoList= () => {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "right",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .container
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  const summaryw=JSON.parse(localStorage.getItem('summary'));
  const [loading , setLoading]=useState(false)
  const [user, setUser] = useState({
    title: "",
    picture: "",
    description: "",
    expirationDate: "",
    status: "",
   
  });
  const {id} = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    setLoading(true)
    const res = await axios.get(`http://198.199.67.201:8080/Api/Promotion/All/${id}`
    ,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(()=>{
      setLoading(false)
    })
    ;
    setUser(res.data);
    console.log(res.data)
    console.log(res)
    
  };
  if(loading){
    return <Loading/>
  }
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/PromoView">
        back to Home
      </Link>
      <h1 className="display-4">PromoID: {id}</h1>
      <hr />
      <ul className="list-group w-50" class="ul border shadow">
     
        <li className="list-group-item"> <img className="fresh-inputx" src={user.picturePath}/> </li>
        <li className="list-group-item"> <label>Title: </label>{user.title}</li>
        <li className="list-group-item">Description: {user.description}</li>
        <li className="list-group-item">Expiration Date: {user.expirationDate}</li>
 
        
        <li className="list-group-item">Status: {user.status ? "true" : "false"}</li>
      </ul>
    </div>
  );
};

export default PromoList;
