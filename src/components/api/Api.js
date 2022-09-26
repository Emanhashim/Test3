import React, { useState, useEffect } from "react";
import axios from "axios";


// Global calling of Api object(json) for total commision bazar paid agent
const jwt = JSON.parse(localStorage.getItem("jwt"));
// getting the token
export default function Api() {
  return <div> api</div>;
}

export const Get_TransactionFee = async () => {
  const [user, setUser] = useState({
    totalTransactionfee: "",
  });

  const res = await axios
    .get(
      "http://198.199.67.201:8080/Api/Accounts/TotalTransferFee",

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((response) => {
      localStorage.setItem(
        "totalTransactionfee",
        JSON.stringify(response.data.totalTransactionfee)
      );
      const totalTransactionfee = localStorage.getItem("totalTransactionfee");
      console.log(totalTransactionfee);

      setUser(response);
    });

  console.log(Get_TransactionFee);
};

//Rest get Api for Total Transaction Fee



export const Get_TotalCommission = async () => {
  const [user, setUser] = useState({
    totalCommission: "",
  });

  const res = await axios
    .get(
      " http://198.199.67.201:8080/Api/Accounts/TotalCommission",

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((response) => {
      localStorage.setItem(
        "totalCommission",
        JSON.stringify(response.data.totalCommission)
      );
      const totalCommission = localStorage.getItem("totalCommission");
      console.log(totalCommission);

      setUser(response);
    });


};

//Rest get Api for Total Commission
export const Get_Revenue = async () => {
  const [user, setUser] = useState({
    totalTransactionfee: "",
  });
 
  const res = await axios
    .get(
      "http://198.199.67.201:8080/Api/Accounts/Revenue",

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((response) => {
      localStorage.setItem(
        "revenue",
        JSON.stringify(response.data. revenue)
      );
      const  revenue = localStorage.getItem(" revenue");
      console.log( revenue);

      setUser(response);
    });


};
export const axiosRequest = axios.create({
  baseUrl: "http://198.199.67.201:8080/Api/SignIn/Admin"
});



//Rest get Api for Total Transaction fee