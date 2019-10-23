import React, { useRef } from "react";
import Grid from "./grid/Grid";
import ScheduleHeader from "./scheduleHeader/ScheduleHeader";
import ScheduleBody from "./scheduleBody/ScheduleBody";
import "./Schedule.scss";

let curScroll=0;
function Schedule() {
  const myRef = useRef(null);
  let byInside=false;
  const scrollToElement = (ref) => {

    if (ref && ref.current && myRef) {
      byInside=true;
      myRef.current.scrollTo(0, ref.current.offsetTop);
    }
    else if(myRef.current){
      myRef.current.scrollTo(0, curScroll);
    }
  };
  const handleScroll=()=>{
    if(myRef.current && !byInside){
      curScroll=myRef.current.scrollTop;
    }
    byInside=false;
  };
  return (
    <div className="schedule" ref={myRef} onScroll={handleScroll}>
      <Grid scrollToElement={scrollToElement}></Grid>
      <div className="schedule__table">
        <ScheduleHeader></ScheduleHeader>
        <ScheduleBody ></ScheduleBody>
      </div>
    </div>
  );
}

export default Schedule;
