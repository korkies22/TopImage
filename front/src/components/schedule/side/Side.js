/* eslint-disable no-undef */
import React,{useState} from "react";
import "./Side.scss";
import {useSelector} from "react-redux";

import ScheduleList from "../scheduleList/ScheduleList";
import Filter from "../filter/Filter";

function Side() {

  const [currentTab,setCurrentTab]=useState(0);

  const useSchedules = () =>
    useSelector(state => state.schedules.schedules, []);
  const mySchedules=useSchedules();

  const tabs=[<ScheduleList key={0}/>,<Filter key={1}/>];
  const curTabs=[{image:require("../../../assets/icons/list.svg"),name:"Horarios"},{image:require("../../../assets/icons/magnifying-glass.svg"),name:"Eventos"}];

  function changeTab(index)
  {
    setCurrentTab(index);
  }

  return (
    <div className="side">
      <div className="side__tabs">
        {curTabs.map((el,index)=>(
          <button className={
            `side__tab 
            side__tab--${index===currentTab?"on":"off"}
            ${index>0 && (!mySchedules || mySchedules.length===0)?"side__tab--hidden":""}`
          }
          key={index} onClick={()=>changeTab(index)}>
            <img alt={"tab-"+index} src={el.image}/>{el.name}
          </button>
        ))}
      </div>

      {tabs[currentTab]}

      
    </div>
  );
}

export default Side;
