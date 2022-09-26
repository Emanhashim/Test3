import React from "react";
import { BsThreeDots } from "react-icons/bs";
import expenseLogo1 from "../assets/expenseLogo1.png";
import expenseLogo2 from "../assets/expenseLogo2.png";
import expenseLogo3 from "../assets/expenseLogo3.png";
import expenseLogo4 from "../assets/expenseLogo4.png";
import expenseLogo5 from "../assets/expenseLogo5.png";
import expenseLogo6 from "../assets/expenseLogo6.png";
import expenseLogo7 from "../assets/expenseLogo7.png";
import {NavLink as Link , NavLink} from 'react-router-dom'
import CBE_SA from "../assets/CBE_SA.png";
import Nib from "../assets/Nib.png";
import zemen from "../assets/zemen.jpg";
import Awash from "../assets/Awash.png";
import AbayBank from "../assets/AbayBank.png";
import addis from "../assets/addis.png";

export default function Expenses() {
  const data = [
    {
      logo: Nib ,
      name: "	Nib Bank",
      price: "-$5K",
    },
    {
      logo: AbayBank,
      name: "Abay Bank ",
      price: "-$50",
    },
    {
      logo: zemen,
      name: "Zemen Bank",
      price: "-$200",
    },
    {
      logo: addis,
      name: "Addis Bank",
      price: "-$20K",
    },
    {
      logo: Awash,
      name: "Awash International Bank",
      price: "-$30K",
    },
    {
      logo: CBE_SA,
      name: "	Commercial Bank of Ethiopia",
      price: "-$7K",
    },
   
  ];
  return (
    <div className="expenses">
      <div className="expenses__info">
        <h4>Banks Supported by Bazra</h4>
        <BsThreeDots />
      </div>
      <div className="expenses__container">
        {data.map((expense) => {
          return (
            <div className="expense">
                <NavLink style={{ textDecoration: 'none' }} to='/BankListView' activeStyle>
              <img src={expense.logo} alt="" />
              </NavLink>
              <h4 className="expense__title" >{expense.name}</h4>
         
              <h6 className="expense__price">{expense.price}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
