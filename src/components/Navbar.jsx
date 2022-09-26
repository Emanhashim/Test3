import React ,{useState, useEffect} from "react";
import { VscArrowSwap } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import avatar from "../assets/imgx.jpg";
import {BiRotateLeft } from "react-icons/bi";
import { NavLink as Link, NavLink } from 'react-router-dom';
import Popup from "reactjs-popup";
import './PopUp.css'
import axios from 'axios'
export default function Navbar() {
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [users, setUser] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = users.filter((value) => {
      return value.firstName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };


useEffect(() => {
  loadUsers();
}, []);
  const loadUsers = async () => {

    const result = await axios.get("http://198.199.67.201:8080/Api/Accounts/Merchants",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {

  });
    setUser(result.data.reverse());
  };
  const Card = ({ title }) => (
    <div className="card">
      <div className="header">{title}    </div>
      <div className="content">
      {filteredData.slice(0, 15).map((user, key) => {
            return (
              <Link  style={{ textDecoration: 'none' }} to={`/merchants/${user.id}`}>
                <p className="dataItem"  class="list-group-item list-group-item-action"> <FaSearch />{user.firstName} </p>
          </Link>
            );
          })}
          
       
        
      </div>
    </div>
  );
  const reloadPage = () => {
    window.location.reload(true)
    
  }
  return (
    <div className="navbar">
      <div className="avatar">
        <img src={avatar} alt="" />
        <div className="info">
        
                      Admin
          <h4 className="title"></h4>
          <h6 className="status">Robel</h6>
          
        </div>
      </div>
    
      <div className="quick">

  

  <button onClick={reloadPage}>
  Reload
    <BiRotateLeft  />
  </button>
 
</div>
     
      <div className="quick">

      <NavLink style={{ textDecoration: 'none' }} to='/Trasnfers' activeStyle>  

        <button>
          <VscArrowSwap />
          Quick Transactions
        </button>
        </NavLink>
      </div>
      <div className="navbar__info">
      <Popup
      trigger={<button className="button"> <IoMdNotificationsOutline /></button>}
      position="bottom center"
      on="hover"
    >
      <Card title="Notifications" />
      
    </Popup>
   
    
        
     
        <div className="search__bar">
         
          <Popup
      trigger={<input type="text"
   
      value={wordEntered}
      onChange={handleFilter} placeholder="Search" />}
      position="bottom center"
      on="hover"
    >
      <Card title="" />
      
    </Popup>
          <FaSearch />
         
        </div>
      </div>
    </div>
    
  );
  
}
