import React ,{useEffect , useState}from 'react'
import styled from 'styled-components'
import { FaMoneyBillAlt} from "react-icons/fa";

import { BsFillCalendar2WeekFill ,BsFillArrowUpCircleFill,BsFillArrowDownCircleFill} from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup,BiArrowFromBottom } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";
import { NavLink as Link, NavLink } from 'react-router-dom';
import { cardStyle } from '../components/ReusableStyles';
import{GiTakeMyMoney,GiPayMoney,GiReceiveMoney,GiMoneyStack} from "react-icons/gi";
import CountUp from 'react-countup';
import { useHistory } from "react-router-dom";
import scrollreveal from "scrollreveal";
import axios from "axios";
import Loading from '../components1/merchant/Loading';
import LoginMA from './login/LoginAdmin';
import { ErrorBoundary } from '../ErrorBondaryAdmin/ErrorBoundary';


export default function Wallets({username}) {
  const [loading, setLoading] = useState(false);
  const jwt =JSON.parse(localStorage.getItem('jwt'));

  let resp = null;
  const TotalTransactionfee = localStorage.getItem('totalTransactionfee');
  if (TotalTransactionfee) {
    try {
      resp = JSON.parse(TotalTransactionfee);
    } catch (e) {}
  }
  const revenue = localStorage.getItem('revenue');
  if (revenue) {
    try {
      resp = JSON.parse(revenue);
    } catch (e) {}
  }
  
  const totalCommission = localStorage.getItem('totalCommission');
  if (totalCommission) {
    try {
      resp = JSON.parse(totalCommission);
    } catch (e) {}
  }


  const questionSSS = localStorage.getItem('questions');
  if ( questionSSS) {
    try {
      resp = JSON.parse(questionSSS);
    } catch (e) {}
  }

 
   console.log(questionSSS)

  console.log(totalCommission)

  const [user, setUser] = useState({
   
   
   
  });
 
 //TODO 
// calculation to get the substracted date for the  var valueInString = "2383";
//var num = parseFloat(valueInString);
//var val = num - (num * .35);
//console.log(val);
  
  useEffect(() => {
    window.onload= loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const res = await axios.get("http://198.199.67.201:8080/Api/Accounts/TotalTransferFee"
    ,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {
      setLoading(false);
  });
    ;
    setUser(res.data);
    console.log(res.data)
    console.log(res)
    
  };
  
  fetch("http://198.199.67.201:8080/Api/Accounts/Revenue", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('revenue', JSON.stringify(response['revenue']));
      const revenue = localStorage.getItem('revenue')
        console.log(revenue)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
   

  fetch( "http://198.199.67.201:8080/Api/Accounts/TotalCommission", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('totalCommission', JSON.stringify(response['totalCommission']));
      const totalCommission = localStorage.getItem('totalCommission')
        console.log(totalCommission)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
  fetch("http://198.199.67.201:8080/Api/Accounts/TotalTransferFee", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('totalTransactionfee', JSON.stringify(response['totalTransactionfee']));
      const totalTransactionfee = localStorage.getItem('totalTransactionfee')
        console.log(totalTransactionfee)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
  fetch("http://198.199.67.201:8080/Api/Accounts/AllTransactions/", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('transaction', JSON.stringify(response['transaction']));
      const transaction = localStorage.getItem('transaction')
        console.log(transaction)
        
     
      
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
      localStorage.setItem('summary', JSON.stringify(response['summary']));
      const summary = localStorage.getItem('summary')
        console.log(summary)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });

 
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
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .analytic , .logo , .content
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const loadUsers = async () => {
    const result = await axios.get("http://198.199.67.201:8080/Api/Question/All",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
            
    }}).then((response) => {
      // Success 🎉
      
      localStorage.setItem('questions', JSON.stringify(response.data.questions))
      const questionSSS= localStorage.getItem('questions')
      console.log(questionSSS)
      console.log(response.data.questions);
  }).catch(function (error) {
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
     
    })
  
   
  };

  return (
   <Section> 
  
 
  
  <ErrorBoundary>
  <NavLink style={{ textDecoration: 'none' }} to='/Transaction_Fee' activeStyle>
<div className="analytic">
  
<div className="logo">
<GiMoneyStack/>
</div>


  <div className="content">
    <h5>Transaction<abbr title='Total Amount of Money Bazra Account Collected Form Customers '> Fee</abbr></h5>
    
  <h4 className="status"><CountUp className="status" start={800}
  end={ TotalTransactionfee?? "Not loaded yet"}
  duration={2.75}/> Birr</h4> 
  </div>
</div>
</NavLink>

<div className="analytic">
<abbr title='total comission paid for agents  '> </abbr>
  <div className="content">
    {username}
    <h5 >Total Commission <abbr title='Total Comission Paid for Agents  '>Paid </abbr> </h5>
    <h4 className="status1"><CountUp className="status1" start={100}
  end={totalCommission ?? "Not loaded yet" }
  duration={2.75}/> Birr</h4>
   

   
  </div>
 
  <div className="logo">
  <GiReceiveMoney/>
  </div>
  
</div>

<div className="analytic">
<div className="logo">
<RiMoneyDollarCircleLine/>
  </div>

  <div className="content">
    <h5>  Revenue  </h5>
     <h4 className="status"><CountUp className="status" start={100}
  end={revenue ?? "Not loaded yet" }
  duration={2.75}/> Birr</h4> 

   
  </div>
  
  
</div>

</ErrorBoundary>
   </Section>
  )
}
const Section= styled.section`



display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  .analytic {
    ${cardStyle};
  
    height: 140px;
    display: inline-block;
    border: 1px solid grey;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;

    .content{
      .status {
        color: #80b918;
      }
     
       .status1 {
        color: #992906;
      }
      .status2 {
        color: #ffc107;
      }
    }
    
    transition: 0.5s ease-in-out;
    &:hover {
    
      transition: .3s ease-in-out;
      cursor: pointer;
      background-color: #ffc107;
      color: white;
      svg {
        color: white;
      }
    }
    .logo {
      box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
      background-color: black;
      border: 2px solid #ffc107;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
      
    }
}

@media screen and (min-width: 280px) and (max-width: 720px) {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  .analytic {
    &:nth-of-type(3),
    &:nth-of-type(4) {
      flex-direction: row-reverse;
    }
  }
}`;