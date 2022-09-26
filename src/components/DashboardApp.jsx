import React ,{useEffect}from 'react'
import ActivityLog from "./ActivityLog";
import Expenses from "./Expenses";
import Navbar from "./Navbar";
import Overview from "./Customer_Agent_Merchant_Board";
import Transactions from "./MonthlyTransactions";
import Wallets from "./Wallets";


import scrollreveal from "scrollreveal";


export default function DashboardApp() {
  
  useEffect(() => {
 
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .app
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <div class="app">
      <Navbar />
      <div className="app__grid">
        <div className="app__grid__1">
         
          <Wallets />
     
        <Expenses/>
          <Transactions />
        </div>
        <div className="app__grid__2">
          <Overview />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}
