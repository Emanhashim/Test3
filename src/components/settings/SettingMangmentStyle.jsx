import React ,{useEffect,useState,}from 'react'
import styled from 'styled-components';

import SettingList from './SettingList';

import scrollreveal from "scrollreveal";


export default function SettingMangmentStyle() {
  


  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return <Section>

  <div className="grid">

    <div className="row__two">
    
     
    </div>
    <div className="row__one">
    <SettingList/>
    
    </div>
  </div>
</Section>
}
const Section=styled.section`
margin-left: 4vw;
margin-top: -14vw;
padding: 2rem;
height: 100%;

.grid {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  width: 700px;
    
  margin-top: 2rem;
  .row__one {
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    height: 50%;
    gap: 1rem;
    
  }
  .row__two {
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    gap: 1rem;
    height: 50%;
  }
}
@media screen and (min-width: 580px) and (max-width: 780px) {
  margin-left: 0;
  .grid {
    .row__one,
    .row__two {
      grid-template-columns: 1fr;
    }
  }
}
`;