
import React ,{useEffect,useState,}from 'react'
import styled from 'styled-components'
import { FaMoneyBillAlt,FaMoneyCheckAlt} from "react-icons/fa";
import{GiTakeMyMoney,GiPayMoney,GiReceiveMoney,GiMoneyStack} from "react-icons/gi";
import { BsFillCalendar2WeekFill ,BsFillArrowUpCircleFill,BsFillArrowDownCircleFill} from "react-icons/bs";

import{MdTransferWithinAStation} from "react-icons/md";

import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { NavLink as Link, NavLink } from 'react-router-dom';
import {RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiGroup,BiTransfer } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyle } from '../components/ReusableStyles';
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
export default function AdminTransferx() {const jwt =JSON.parse(localStorage.getItem('jwt'));
const mex =JSON.parse(localStorage.getItem('message'));
console.log(mex)

function send(){history.push("/dash")}


const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [fromAccountNumber,setFromAccountNumber]=useState("")
  const [password, setPassword] = useState("");

function mess(){
const mess =JSON.parse(localStorage.getItem('message'));

}
  const history=useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
   
      swal({
        title: "Are you sure?",
        text: `Do you want to send ${amount} Birr to this Account Number: ${toAccountNumber}`,
  
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
          swal(`The returned value is: ${login()}`, {
            icon: "success",
          });
        } else {
          swal("You Canceled your Transfer!");
        }
        });
    }
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { isDisabled }) => {
          return {
            ...styles,
            backgroundColor: isDisabled ? "red" : "green",
            color: "#FFF",
            cursor: isDisabled ? "not-allowed" : "default"
          };
        }
      };
async function login(){
  

  const account={fromAccountNumber,toAccountNumber,amount,message}
 
  let item={fromAccountNumber,toAccountNumber,amount,message};
 const options={
      method:'POST',
      headers:{

          'Content-Type':'application/json',
          "Accept":"application/json",
          "Authorization":`Bearer ${jwt}`
         
      },
      body:JSON.stringify(item)
      
  }
  const url ="http://198.199.67.201:8080/Api/Accounts/AdminSendMoney"
  try{
   const response= await fetch(url,options);
   const result =await response.json();
   
    const total=result
    console.log(result)
 console.log(total)

 localStorage.setItem('message', JSON.stringify(result['message']))
const mess= localStorage.getItem('message')



localStorage.setItem('transactionDateTime', JSON.stringify(result['transactionDateTime']))
const datex= localStorage.getItem('transactionDateTime')
console.log(datex)
   
 
if(response.ok){
  console.log("successful")
  
  swal({
    title: mess,
    
    text:`${datex}` ,
    icon: "success",
    button: send(),
  });
  
  
  
  
}else{
  console.log("failed")
swal("Failed", mess, "error")
}
}catch(error) {
  console.error(error);
}

 
}

return (
    
 <Section>
   <NavLink style={{ textDecoration: 'none' }} to='/trans' activeStyle>  </NavLink>
   <form onSubmit={handleSubmit(onSubmit)}>

<div className="format">
 


<Form.Field>

<h5> From Account Number</h5>
<div className="analytic">
<div className="content">

</div>
<input type="text" className= "form-input" placeholder='Enter Account number'
 {...register("Number5", {
  required: {
    value: true,
    message: "Entry Required",
  },
  pattern: {
    value:
    /^\+?\d*$/,
    message: "Only Number",
  },
 
})}
  onChange={(e) => setFromAccountNumber(e.target.value)} 
  />

</div>
</Form.Field>
{errors.Number5 && <p className="text-error">{errors.Number2.message}</p>}

<Form.Field>

<h5>To Account Number</h5>
<div className="analytic">
<div className="content">

</div>
<input type="text" className= "form-input" placeholder='Enter Account number'
 {...register("Number2", {
  required: {
    value: true,
    message: "Entry Required",
  },
  pattern: {
    value:
    /^\+?\d*$/,
    message: "Only Number",
  },
 
})}
  onChange={(e) => setToAccountNumber(e.target.value)} 
  />

</div>
</Form.Field>
{errors.Number2 && <p className="text-error">{errors.Number2.message}</p>}
<Form.Field>

<h5> Set Amount</h5>
<div className="analytic">
<div className="content">
 
</div>

<input type="text" className= "form-input" placeholder='Enter Amount'
    {...register("Number1", {
      required: {
        value: true,
        message: "Entry Required",
      },
      pattern: {
        value:
        /^[0-9\b]+$/,
        message: "Only Number",
      },
     
    })}
 onChange={(e) => setAmount(e.target.value)} 
 />


</div>
{errors.Number1 && <p className="text-error">{errors.Number1.message}</p>}
</Form.Field>

<Form.Field>

<h5>Remark</h5>
<div className="analytic">
<div className="content">
  
</div>

<input type="text" className= "form-input" placeholder='Enter Remark'
 {...register("remark", { required: true, maxLength: 10 })}
 onChange={(e) => setMessage(e.target.value)} 
 />


</div>
</Form.Field>

{errors.remark && <p className="text-error">*Entry Required</p>}

  <Button type='submit' className="btn"  > Next</Button>

</div>

</form>
 </Section>
 
)
}
const Section= styled.section`
margin-left: 25vw;
padding: 2rem;
height: 100%;
display: grid;
grid-template-columns: repeat(1, 1fr);
gap: 2rem;
.format{
 
.btn {
  box-shadow: 0 0 2px #080808;
width: 20%;
height: 50px;
margin-top: 17px;
margin-left: 8vw;
background: linear-gradient(
  90deg,
  rgb(251, 255, 39) 0%,
  rgb(251, 255, 39) 100%
);
outline: none;
border: none;
color: rgb(12, 12, 12);
font-size: 1rem;
border-radius: 20px;
}
.analytic {
    width: 200px;
    height:90px;
  display: inline-block;
  border: 1px solid grey;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  ${cardStyle};
  padding: 1rem;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
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
    width: 600px;
    background-color: black;
    border-radius: 1rem;
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