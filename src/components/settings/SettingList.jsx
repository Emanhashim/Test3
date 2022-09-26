import React ,{useEffect}from 'react'
import styled from 'styled-components'
import { FaMoneyBillAlt,FaMoneyCheckAlt} from "react-icons/fa";
import{GiTakeMyMoney,GiPayMoney,GiReceiveMoney,GiMoneyStack} from "react-icons/gi";
import { BsFillCalendar2WeekFill ,BsFillArrowUpCircleFill,BsFillExclamationTriangleFill,BsPerson} from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import{MdTransferWithinAStation} from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { NavLink as Link, NavLink } from 'react-router-dom';
import {RiMoneyDollarCircleLine, RiBankLine } from "react-icons/ri";
import { BiGroup,BiTransfer ,BiQuestionMark} from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import {SiAuth0} from "react-icons/si";
import { cardStyle } from '../../components1/users/ReusableStyles';
 import './SettingRibbonStyle.css'
import scrollreveal from "scrollreveal";
export default function SettingList() {
 
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "500px",
      duration: 1000,
      reset: false,
    });
    sr.reveal(
      `
      .analytic , .logo
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
 

  return (
   <Section>
         
 
     <NavLink style={{ textDecoration: 'none' }} to='/trans' activeStyle>

  
   </NavLink>
   <NavLink style={{ textDecoration: 'none' }} to='/AuthenticationListView' activeStyle>
   <div class="ribbon ribbon-top-left"><span>Setting</span></div>     
<div className="analytic">

    
<h5>Authentication Type </h5>

  <div className="content">
  
  </div>
  <div className="logo">
  <SiAuth0/>
  
</div>
</div>

</NavLink>


<NavLink style={{ textDecoration: 'none' }} to='/SecurityV' activeStyle>
<div className="analytic">
<h5>Login ID Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </h5>


  <div className="content">
  
  </div>
  <div className="logo">
    
  <FiLogOut/>
  
</div>
</div>

</NavLink>

   </Section>
  )
}
const Section= styled.section`

margin-top: -8vw;
display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.1rem;
  padding: 30rem;
  .analytic {
    margin-top: -200px;
    margin-left: -9vw;
    height: 1px;
    width: 750px;
    background-color: #212121;
    display: inline-block;
    border: 2px solid #ffc107;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    ${cardStyle};
    padding: 3rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    border-radius: 1rem 1rem 1rem 1rem ;
    &:hover {
      
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
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
        font-size: 1.4rem;
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