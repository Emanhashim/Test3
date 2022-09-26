import React ,{useEffect}from 'react'
import styled from 'styled-components'
import { FaMoneyBillAlt,FaMoneyCheckAlt} from "react-icons/fa";
import{GiTakeMyMoney,GiPayMoney,GiReceiveMoney,GiMoneyStack} from "react-icons/gi";
import { BsFillCalendar2WeekFill ,BsFillArrowUpCircleFill,BsFillExclamationTriangleFill,BsPerson} from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import{MdTransferWithinAStation} from "react-icons/md";

import { NavLink as Link, NavLink } from 'react-router-dom';
import {RiMoneyDollarCircleLine, RiBankLine } from "react-icons/ri";
import { BiGroup,BiTransfer ,BiQuestionMark} from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyle } from '../components/ReusableStyles';
import scrollreveal from "scrollreveal";
export default function Mangemntx() {
 
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
   <NavLink style={{ textDecoration: 'none' }} to='/PromoView' activeStyle>
<div className="analytic">
<h5>Promotion Management </h5>
  <div className="content">
  
  </div>
  <div className="logo">
  <BsPerson/>
  
</div>
</div>

</NavLink>


<NavLink style={{ textDecoration: 'none' }} to='/SecurityV' activeStyle>
<div className="analytic">
<h5>Security Question &nbsp;&nbsp;&nbsp;&nbsp;<br /> </h5>
  <div className="content">
  
  </div>
  <div className="logo">
    
  <BiQuestionMark/>
  
</div>
</div>

</NavLink>


<NavLink style={{ textDecoration: 'none' }} to='/Threshold' activeStyle>
<div className="analytic">
<h5> Threshold Management <br /></h5>
  <div className="content">
   
  </div>
  <div className="logo">
    <BsFillExclamationTriangleFill/>
  </div>
</div>

</NavLink>
<NavLink style={{ textDecoration: 'none' }} to='/BankListView' activeStyle>
<div className="analytic">
<h5> Bank Management &nbsp; &nbsp; &nbsp;&nbsp;<br /></h5>
  <div className="content">
    
  </div>
  <div className="logo">
    <RiBankLine/>
  </div>
</div>

</NavLink>
<NavLink style={{ textDecoration: 'none' }} to='/TransactionFeeManagment' activeStyle>
<div className="analytic">
<h5>Fee management &nbsp; &nbsp; &nbsp;&nbsp; <br /></h5>
  <div className="content">
    
  </div>
  <div className="logo">
    <GiReceiveMoney/>
  </div>
</div>

</NavLink>
   </Section>
  )
}
const Section= styled.section`
margin-top: -14vw;
display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.1rem;
  padding: 26rem;
  .analytic {
    margin-top: -100px;
    margin-left: -3vw;
    height: 1px;
    width: 750px;
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