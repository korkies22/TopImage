import React, { useRef } from "react";
import "./Grid.scss";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Occurrence from "./occurrence/Occurrence";

import { setCurrentSchedule } from "../../../../store/schedules";

function Grid(props) {
  // Put op
  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const monday = useSelector(state => {
    const curMonday = new Date(state.week.curMonday);
    return new Date(curMonday.getFullYear(), curMonday.getMonth(), curMonday.getDate());
  });
  const myRef = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const useCurrentSchedule = () =>
    useSelector(state => state.schedules.schedule) || {collegeEvents:[]};
  const currentSchedule = useCurrentSchedule();


  const updateCurrentSchedule = async () => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`${url}users/${user._id}/schedules/${currentSchedule._id}`,
        currentSchedule, options);
      dispatch(setCurrentSchedule(currentSchedule));
    }
    catch (error) {
      console.error(error);
    }
  };

  const eliminateOccurrence = (id) => {
    const index = currentSchedule.collegeEvents.findIndex(el => el._id === id);
    currentSchedule.collegeEvents.splice(index, 1);
    updateCurrentSchedule();
  };

  const calcOverlap = (eventT) => {
    const arr = currentSchedule.collegeEvents || [];
    // eslint-disable-next-line no-unused-vars
    for (const item of arr) {
      if (!(item.dateEnd <= eventT.dateStart || item.dateStart >= eventT.dateEnd)) {
        return true;
      }
    }
    return false;
  };

  // Render items
  const nextMonday = new Date(monday.getTime() + 60 * 60 * 24 * 7 * 1000);
  const items = currentSchedule.collegeEvents ?
    currentSchedule.collegeEvents.filter((el) => {
      return new Date(el.dateStart) >= monday && new Date(el.dateEnd) <= nextMonday;
    }).map((el, index) => (
      <Occurrence key={el._id ? el._id : index} ref={myRef} element={el} eliminateOccurrence={() => eliminateOccurrence(el._id)} />))
    : <div></div>;

  const tempEvent = useSelector(state => state.schedules.tempEvent);

  let tempOccurrence = null;
  if (tempEvent) {
    if (calcOverlap(tempEvent)) {
      tempEvent.overlap = true;
    }
    else {
      tempEvent.overlap = false;
    }
    tempOccurrence =
      <Occurrence key={tempEvent._id}
        ref={myRef}
        element={tempEvent}
        eliminateOccurrence={() => eliminateOccurrence(tempEvent._id)} />;
  }

  // Render
  let resp = (
    <div className="grid">
      {items}
      {tempOccurrence}
    </div>
  );

  setTimeout(() => props.scrollToElement(myRef), 10);


  return resp;
}

export default Grid;
