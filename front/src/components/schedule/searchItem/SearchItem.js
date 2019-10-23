import React from "react";
import axios from "axios";
import "./SearchItem.scss";
import { setCurrentSchedule, setTempEvent } from "../../../store/schedules";
import { setMonday, reselectCurMonday } from "../../../store/week";
import { getHash } from "../../../util/events/events";
import { getMonday } from "../../../util/date/date";
import { useSelector, useDispatch } from "react-redux";


import PropTypes from "prop-types";


function SearchItem(props) {
  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  
  const dispatch = useDispatch();
  const useSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule=useSchedule();

  const updateCurrentSchedule = async (events) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const schedule= {...currentSchedule};
      schedule.collegeEvents=events;
      await axios.put(`${url}users/${user._id}/schedules/${schedule._id}`,
        schedule, options);
      dispatch(setCurrentSchedule(schedule));
    }
    catch (error) {
      console.error(error);
    }
  };

  const isAdded=()=>{
    return currentSchedule.collegeEvents.some(el=>el._id && el._id.toString()===props.element._id);
  };

  const changeWeek=()=>{
    const dateStart= props.element.dateStart;
    const newMonday= getMonday(dateStart);
    dispatch(setMonday(newMonday));
  };

  const addItem= () =>{
    if(!currentSchedule) return;
    if(!currentSchedule.collegeEvents)
    {
      currentSchedule.collegeEvents=[];
    }
    const events= [...currentSchedule.collegeEvents];
    events.push(props.element);
    updateCurrentSchedule(events);
  };

  const addTempItem= () =>{
    changeWeek();
    dispatch(setTempEvent({...props.element,isTemp:true}));
  };

  const removeTempItem= () =>{
    if(!isAdded())
      dispatch(reselectCurMonday());
    dispatch(setTempEvent(null));
  };

  const colorsLength=6;
  return (
    <div onClick={addItem} onMouseEnter={addTempItem} onMouseLeave={removeTempItem}
      className={`search-item search-item--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <h4 className="search-item__title">{props.element.title}</h4>
      <h6 className="search-item__type">{props.element.type}</h6>
    </div>
  );
}

SearchItem.propTypes={
  element:PropTypes.any,
  eliminateOccurrence:PropTypes.any
};

export default SearchItem;
