import React from "react";
import styled from "styled-components";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMail } from "react-icons/fi";

export default function ActivityLog() {
  const countries = [
    {
      name: "One Account Has Been Blocked",
      amount: "04 June 2022 | 04:00 PM",
     
    },
    {
      name: "One Account Has Been Blocked",
      amount: "04 June 2022 | 04:00 PM",
     
    },
    {
      name: "New Message From Bazra ",
      amount: "04 June 2022 | 04:00 PM",
     
    },
    {
      name: "New Message From Bazra ",
      amount: "04 June 2022 | 04:00 PM",
     
    },
    {
      name: "You Get a Commissions",
      amount: "04 June 2022 | 04:00 PM",
    
    },
    {
      name: "One Account Has Been Blocked",
      amount: "04 June 2022 | 04:00 PM"
     
    },
    {
      name: "New Message From Bazra ",
      amount: 13,
     
    },
    {
      name: "New Message From Bazra ",
      amount: 10,
  
    },
    {
      name: "One Account Has Been Blocked",
      amount: 64,
     
    },
    {
      name: "One Account Has Been Blocked",
      amount: 24,
      
    },
    {
      name: "New Message From Bazra ",
      amount: 13,
     
    },
    {
      name: "Canada",
      amount: 10,
   
    },
    {
      name: "One Account Has Been Blocked",
      amount: 64,
     
    },
    {
      name: "One Account Has Been Blocked",
      amount: 24,
      
    },
    {
      name: "New Message From Bazra ",
      amount: 13,
     
    },
    {
      name: "New Message From Bazra ",
      amount: 10,
    
    },
  ,
  ];
  const data = [
    {
      data: 3800,
    },
    {
      data: 3900,
    },
    {
      data: 4000,
    },
    {
      data: 4100,
    },
    {
      data: 4200,
    },
    {
      data: 4300,
    },
    {
      data: 4400,
    },
    {
      data: 4500,
    },
    {
      data: 4600,
    },
    {
      data: 4700,
    },
    {
      data: 4800,
    },
    {
      data: 4900,
    },
    {
      data: 5100,
    },
    {
      data: 5200,
    },
    {
      data: 5300,
    },
    {
      data: 5400,
    },
    {
      data: 5500,
    },
    {
      data: 5600,
    },
    {
      data: 6000,
    },
    {
      data: 6300,
    },
    {
      data: 6580,
    },
    {
      data: 6500,
    },
    {
      data: 6300,
    },
    {
      data: 6500,
    },
    {
      data: 6700,
    },
    {
      data: 7000,
    },
    {
      data: 7300,
    },
    {
      data: 7500,
    },
    {
      data: 7700,
    },
  ];
  return (
    <Section>
      <div className="title-container">
        <div className="title">
          <h1>  <IoMdNotificationsOutline />Notifications </h1>
        
        </div>
        <div className="chart">
          <div className="percent"></div>
         
        </div>
      </div>
      <div className="active">
        {countries.map((data, index) => {
          return (
            <div className="country" key={index}>
              <div className="name">
              
              <FiMail /> 
                <h6>{data.name}</h6>
               
                <h6>{data.amount}</h6>
              </div>
             
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  border-bottom: 0.1rem solid #242424;
  color: white;
  .title-container {
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding-top: 1rem;
    .title {
      h4 {
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
      }
      h1 {
        font-size: 1.5rem;
        letter-spacing: 0.2rem;
      }
    }
    .chart {
      position: relative;
      .percent {
        position: absolute;
        top: 0;
        left: 0;
        color: var(--primary-color);
        font-size: 0.8rem;
      }
      height: 4rem;
      width: 100%;
    }
  }
  .active {
    max-height: 11rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1.5rem;
    margin: 1rem 0;
    ::-webkit-scrollbar {
      width: 0.2rem;
      background-color: #6e6e6ec3;
      &-thumb {
        background-color: #b8b8b8;
      }
    }
    h5 {
      font-weight: 100;
    }
    .country {

      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        height: 25px;
        border-radius: 2rem;
        border: 1px;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #ffc107;
          color: white;
          svg {
            color: white;
          }
        }
        
          
        }
        display: flex;
        gap: 1rem;
        align-items: center;
        img {
          height: 2rem;
          border-radius: 2rem;
        }
      }
    }
  }
`;