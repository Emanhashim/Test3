import React, {useEffect, useState}from "react";
import { SiGoogleanalytics } from "react-icons/si";
import { BiNews, BiRocket } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiFillSetting, AiFillAppstore } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import Loading from '../components1/merchant/Loading';
import axios from "axios";
export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  
  const [user, setUser] = useState({
    totalTransactionfee: "",
   
   
  });
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  fetch("http://198.199.67.201:8080/Api/Promotion/All", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('promotions', JSON.stringify(response['promotions']));
      const promotions = localStorage.getItem('promotions')
        console.log(promotions)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
  fetch("http://198.199.67.201:8080/Api/Bank/All", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('banks', JSON.stringify(response['banks']));
      const banks = localStorage.getItem('banks')
        console.log(banks)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
  fetch("http://198.199.67.201:8080/Api/Accounts/AllAccounts/", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('accounts', JSON.stringify(response['accounts']));
      const accounts = localStorage.getItem('accounts')
        console.log(accounts)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
  fetch("http://198.199.67.201:8080/Api/Question/All", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('questions', JSON.stringify(response['questions']));
      const questions = localStorage.getItem('questions')
        console.log(questions)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
   
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
   
    const res = await axios.get("http://198.199.67.201:8080/Api/Accounts/TotalTransferFee"
    ,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {
   
  });
    ;
    setUser(res.data);
    console.log(res.data)
    console.log(res)
    
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("totalTransactionfee");
    localStorage.removeItem("totalCommission");
    localStorage.removeItem("totalCustomers");
    localStorage.removeItem("totalMerchants");
    localStorage.removeItem("totalAgents");
    localStorage.removeItem("summary");
    localStorage.removeItem("revenue");
    localStorage.removeItem("summary");
    localStorage.removeItem("promotions");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  
   
    window.location.href = "/logina";}
  const links = [
    {
      title: "Dashboard",
      icon: SiGoogleanalytics,
    },
    {
      title: "Management ",
      icon: AiFillAppstore,
    },
    

    {
      title: "Transfer",
      icon: BiRocket,
    },
    {
      title: "Registration Form ",
      icon: BsCashStack,
    },

    {
      title: "Transactions",
      icon: FaWallet,
    },
    {title: "Settings",
    icon: AiFillSetting,
      
    },
    {
      title: "Logout",
      icon: FiLogOut,
    },
  ];
  
  if (loading) {
    return <Loading/>;
  }
  return (
    <div className="sidebar">
      <div className="brand">
        <h2>
          Bazra<span>Motors</span>
        </h2>
      </div>
      <ul className="links">
        {links.slice(0,1).map((link) => {
          return (
            <li>
              <a href="/dashboard">
                {<link.icon />}
             
               { link.title}
              </a>
            </li>
            
            
          );
        })}
      </ul>
      <ul className="links">
        {links.slice(1,2).map((link) => {
          return (
            <li>
              <a href="/Mangemnt">
                {<link.icon />}
             
               { link.title}
              </a>
            </li>
            
            
          );
        })}
      </ul>
      <ul className="links">
        {links.slice(2,3).map((link) => {
          return (
            <li>
              <a href="amt">
                {<link.icon />}
             
               { link.title}
              </a>
            </li>
            
            
          );
        })}
      </ul>
      <ul className="links">
        {links.slice(3,4).map((link) => {
          return (
            <li>
              <a href="signup">
                {<link.icon />}
             
               { link.title}
              </a>
            </li>
            
            
          );
        })}
      </ul>
      <ul className="links">
        {links.slice(4,5).map((link) => {
          return (
            <li>
              <a href="Trasnfers">
                {<link.icon />}
             
               { link.title}
              </a>
            </li>
            
            
          );
        })}
      </ul>
      <ul className="links">
        {links.slice(5,6).map((link) => {
          return (
            <li>
              <a href="SettingList">
                {<link.icon />}
             
               { link.title}
              </a>
            </li>
            
            
          );
        })}
      </ul>
      <ul className="links">
        {links.slice(6,7).map((link) => { 
          return (
            <li>
              <a onClick={handleLogout} >
                {<link.icon />}
                 
               { link.title}
                
              </a>
            </li>
            
            
          );
        })}
      </ul>
    </div>
  );
}