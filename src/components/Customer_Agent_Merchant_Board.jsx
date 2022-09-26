import React ,{useEffect ,useState}from 'react'
import styled from 'styled-components'
  
    import {MdSupportAgent} from "react-icons/md";
import { FaMoneyBillAlt ,FaHouseUser} from "react-icons/fa";
import{GiTakeMyMoney,GiPayMoney ,GiPerson ,} from "react-icons/gi";
import { BsFillCalendar2WeekFill ,BsFillArrowUpCircleFill,BsFillArrowDownCircleFill,Bs} from "react-icons/bs";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GoPerson } from "react-icons/go";
import { FiActivity} from "react-icons/fi";
import { cardStyle } from '../components/ReusableStyles1';
import { NavLink as Link, NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import scrollreveal from "scrollreveal";
import axios from 'axios';
import CountUp from 'react-countup';
import Loading from '../components1/merchant/Loading';
import "./Form.css"
export default function Overview() {
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  const [loading, setLoading] = useState(false);

  let resp = null;
  const totalCustomers = localStorage.getItem('totalCustomers');
  if (totalCustomers) {
    try {
      resp = JSON.parse(totalCustomers);
    } catch (e) {}
  }


  const totalAgents = localStorage.getItem('totalAgents');
  if (totalAgents) {
    try {
      resp = JSON.parse(totalAgents);
    } catch (e) {}
  }
  const totalMerchants = localStorage.getItem('totalMerchants');
  if (totalMerchants) {
    try {
      resp = JSON.parse(totalMerchants);
    } catch (e) {}
  }
  


  const [totalUser ,setTotalUser]=useState(totalCustomers== undefined?"-":totalCustomers,totalAgents== undefined?"-":totalAgents,totalMerchants==  undefined?"-":totalMerchants)

 const [user, setUser]=useState({
  totalCustomers:""
 })

  useEffect(() => {
    try {
      const totalCustomers = JSON.parse(localStorage.getItem('totalCustomers'));
  } catch(e) {
      return null;
  }
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const res = await axios.get("http://198.199.67.201:8080/Settings/TotalCustomers"
    ,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {
      setLoading(false);
  })
    ;
    setUser(res.data);
    console.log(res.data)
    console.log(res)
    
  };
  fetch("http://198.199.67.201:8080/Settings/TotalCustomers", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('totalCustomers', JSON.stringify(response['totalCustomers']));
      const totalCustomers = localStorage.getItem('totalCustomers')
        console.log(totalCustomers)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
 
  fetch("http://198.199.67.201:8080/Settings/TotalMerchants", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('totalMerchants', JSON.stringify(response['totalMerchants']));
      const totalMerchants = localStorage.getItem('totalMerchants')
        console.log(totalMerchants)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
 
  const totAgents= JSON.parse(localStorage.getItem(' totalAgents'));
    console.log(totAgents)
  fetch("http://198.199.67.201:8080/Settings/TotalAgents", {
    method: "GET",
     headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }
  })
  .then(response => response.json())
  .then(response => {
      localStorage.setItem('totalAgents', JSON.stringify(response['totalAgents']));
      const totalAgents = localStorage.getItem('totalAgents')
        console.log(totalAgents)
        
     
      
    this.setState({
      friends: response
      
    })
   
  })
  .catch(err => { console.log(err); 
  });
 

 
  useEffect(() => {
    const sr = scrollreveal({
      origin: "right",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
 
  return (
   <Section> 
  
 
  

  <NavLink style={{ textDecoration: 'none' }} to='/myagent' activeStyle>
<div className="analytic" id='a3'>
<div className="logo">
<MdSupportAgent/>
  </div>
  <div className="content">
 
    <h3> <CountUp className="status" start={1}
  end= {totalAgents ?? "Not loaded yet"}
  duration={6.75}/></h3> 
     <h4 className='push'>Total Number of Agent </h4> 
   
  </div>
</div>
</NavLink>
<NavLink style={{ textDecoration: 'none' }} to='/mymerchant' activeStyle>
<div className="analytic" id='a1'>
<div className="logo">
< SiHomeassistantcommunitystore/>
  </div>
  <div className="content">
  <h3><CountUp className="status" start={1}
  end= {totalMerchants  ?? "Not loaded yet"}
  duration={4.75}/></h3> 
     <h4>Total Number of Merchant </h4> 
   
  </div>
</div>
</NavLink>
<NavLink style={{ textDecoration: 'none' }} to='/home1' activeStyle>
<div className="analytic" id='a2'>
<div className="logo">
< GoPerson />
  </div>
  <div className="content">
    
    <h3>
    <CountUp className="status" start={10}
  end={totalCustomers ?? "Not loaded yet" }
  duration={5.75}/> 
      
</h3> 
    <h4>Total Number of User &nbsp; &nbsp; &nbsp;</h4> 
   
  </div>
</div>
</NavLink>
   </Section>
  )
}
const Section= styled.section`

display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  #a1{
    display: flex;
    background: rgba(69, 250, 93, 0.938);
    &:hover {
      background-color: #ffc107;
      color: white;
      svg {
        color: white;
      }
      
    }
   
    }
    #a2{
   
    
      background: rgba(69, 250, 93, 0.938);
      &:hover {
        background-color: #ffc107;
        color: white;
        svg {
          color: white;
        }
        
      }
      }
      #a2{
      
        background: rgba(235, 232, 78, 0.938);
       
        }
  .analytic {
    
    ${cardStyle};
    
    height: 125px;
    display: inline-block;
    border: 1px solid grey;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    background: rgba(240, 138, 201, 0.938);
  
    &:hover {
      background-color: #ffc107;
      color: white;
      svg {
        color: white;
      }
      
    }
    
    }
    .logo {
      box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
      border: 2px solid #ffc107;
      background-color: black;
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

@media screen and (min-width: 80px) and (max-width: 320px) {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  .analytic {
    &:nth-of-type(3),
    &:nth-of-type(4) {
      flex-direction: row-reverse;
    }
  }
}`;