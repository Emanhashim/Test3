import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import image from "./assets/profileBaz.png";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineLocationMarker, } from "react-icons/hi";
import { GrLicense, } from "react-icons/gr";
import { IoBusiness } from "react-icons/io5";

import {BsCardChecklist} from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import axios from "axios";
import scrollreveal from "scrollreveal";
import CornerRibbon from "react-corner-ribbon";
import Loading from "./Loading";
import { cardStyle } from "./ReusableStyles";
const MerchantMainView = () => {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "right",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .imageBorder
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const [loading, setLoading] = useState(false);
  const jwt =JSON.parse(localStorage.getItem('jwt'));

  const [user, setUser] = useState({
    firstName: "",
    username: "",
    licenceNumber: "",
    businessLNum: "",
    companyType: "",
    lastName:"",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    setLoading(true);
    const res = await axios.get(`http://198.199.67.201:8080/Api/Accounts/Merchant/${id}`
    ,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  
    }).finally(() => {
      setLoading(false);
  });
    ;
    setUser(res.data);
    console.log(res)
    console.log(user.username)
  };
  if (loading) {
    return <Loading/>;
}
  return (
    <Section >
   
         <div className="title" >
      <h4 > <HiOutlineIdentification style={{ fontSize: "20px"  }}/> Merchant ID: {id}</h4>
      </div>
      <hr />
      <div className="imageBorder">
       <div className="image">
         
        <img src={image} alt="" />
      </div>
      </div>
      <div className="title" >

        <h5 >
          < BsPersonCircle style={{ color: "#ffc107" , fontSize: "20px"  }}/>&nbsp;Full Name:<span  style={{ color: "#ffc107" }}>{user.firstName} {user.lastName}</span>
        </h5>
       
      <h5>
      <BsCardChecklist style={{ color: "#ffc107" , fontSize: "20px"   }}/>&nbsp;Licence Number:<span  style={{ color: "#ffc107" }}>{user.licenceNumber}</span>
      </h5>
      <h5>
      <IoBusiness style={{ color: "#ffc107" , fontSize: "20px"   }}/>&nbsp;Business Licence Number:<span  style={{ color: "#ffc107" }}>{user.businessLNum}</span>
     
     
      </h5>
      <h5>
      < MdOutlineAccountBalanceWallet style={{ color: "#ffc107", fontSize: "20px"   }}/>&nbsp;Account Locked:<span  style={{ color: "#ffc107" }}> {user.credentialsNonExpired ? "true" : "false"}</span>
      </h5>
    
       
        </div>
 
    </Section>
  );
};
const Section = styled.section`
  ${cardStyle};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  gap: 1rem;
  margin-left: 25vw;
  margin-top: 2vw;
  height: 40rem;
  border-radius: 50px  3px 50px  3px;
  border: 2px solid #ffc107;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  .imageBorder{
    width: 20rem;
    border: 2px solid #ffc107;
    border-radius: 1rem;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  .image {
    max-height: 15rem;
    overflow: hidden;
  
    margin-left: 3.5vw;
 
  
    img {
     
      height: 10rem;
      width: 10rem;
      object-fit: cover;

      transition: 0.5s ease-in-out;
  
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
}
  .title {
    margin-left: 2vw;
    margin-top: 1vw;
    text-align: justify;
    justify-content: center;
    h2,
    h5 {
      color: black;
     
      letter-spacing: 0.3rem;
    }
    h4 {
      border-radius: 70px  3px 70px  3px;
      border-radius: 0.9rem;
 
      margin-left: -3vw;
      text-align: justify;
      color: black;
         border: 1px solid #e9e6e6;
      box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
      letter-spacing: 0.3rem;
      background: #ffc107;
    }
    h1 {
      color: black;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
    h5 {
      letter-spacing: 0.2rem;
    }
  }
  .info {
    display: flex;
    gap: 1rem;
    .container {
      text-align: center;
    }
  }
`;
export default MerchantMainView;
