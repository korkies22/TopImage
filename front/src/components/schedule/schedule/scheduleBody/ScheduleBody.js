import React,{useState,useRef} from "react";
import "./ScheduleBody.scss";

import { maxRows,maxCols,rangeMinutes,timeStart } from "../../../../util/grid/grid";
import ActionModal from "../../../actions/actionModal/ActionModal.js";
import "../../../actions/actionModal/ActionModal.scss";

import axios from "axios";

import {useSelector,useDispatch} from "react-redux";
import { setCurrentSchedule } from "../../../../store/schedules";
import { setMonday } from "../../../../store/week";
import { getMonday } from "../../../../util/date/date";


import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

function ScheduleBody() {

  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const currentSchedule= useSelector(state => state.schedules.schedule);
  const currentMonday= useSelector(state=>state.week.curMonday);

  const useSchedules = () =>
    useSelector(state => state.schedules.schedules, []);
  const mySchedules=useSchedules();


  // Modal
  let [customEvent,setCustomEvent]=useState({
    title:"",
    description:"",
    type:"",
    dateStart:{},
    dateEnd:{},
    indexStart:0,
    indexEnd:0,
    timeStart:"",
    timeEnd:"",
    place:"",
    days:[]
  });
  const addCustomEventModal = useRef(null);
  const [errorMsg,setErrorMsg]=useState("");


  const activateModal=(i,day)=>{
    if(isScheduleEmpty())
      return;
    
    let minutesStart=(i+11)*30;
    let dateStart= new Date();
    dateStart.setDate(currentMonday.getDate()+day);
    dateStart.setHours(minutesStart/60,minutesStart%60);
    let dateEnd=new Date (dateStart.getTime()+60*30*1000);

    setCustomEvent({
      indexStart:i,
      dateStart:dateStart,
      dateEnd:dateEnd,
      days:[day],
      type:"Custom"
    });

    addCustomEventModal.current.toggle();
  };

  const deactivateModal=()=>{
    setCustomEvent({
      title:"",
      description:"",
      type:"",
      indexStart:0,
      indexEnd:0,
      timeStart:"",
      timeEnd:"",
      place:"",
      days:[]
    });

    console.log("Deactivate?");
    setErrorMsg("");
    addCustomEventModal.current.toggle();
  };

  const validDates=(startDate,endDate)=>{
    if(startDate.getFullYear()!==endDate.getFullYear())
    {
      setErrorMsg("Los eventos deben hacerse en el mismo año");
      return false;
    }
    
    if(startDate.getMonth()!==endDate.getMonth())
    {
      setErrorMsg("Los eventos deben hacerse en el mismo mes");
      return false;
    }

    if(startDate.getDate()!==endDate.getDate())
    {
      setErrorMsg("Los eventos deben hacerse en el mismo día");
      return false;
    }

    if(startDate.getHours()===endDate.getHours() && startDate.getMinutes()===endDate.getMinutes())
    {
      setErrorMsg("Los horarios deben ser diferentes");
      return false;
    }

    return true;
  };


  const changeWeek=(dateStart)=>{
    const newMonday= getMonday(dateStart);
    dispatch(setMonday(newMonday));
  };

  const updateEvent=async (event)=>{
    const options = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const schedule= {...currentSchedule};
    if(!schedule.collegeEvents)
      schedule.collegeEvents=[];
    schedule.collegeEvents.push(event);

    await axios.put(`${url}users/${user._id}/schedules/${schedule._id}`,
      schedule, options);
    dispatch(setCurrentSchedule(schedule));

    changeWeek(event.dateStart);
  };

  const calculateIndex=(time)=>{
    let data = time.split(":");
    let currentTime = parseInt(data[0], 10) * 60 + parseInt(data[1], 10);
    let minRange = parseInt(rangeMinutes, 10);
    let startMin = parseInt(timeStart, 10);
    return Math.floor((currentTime - startMin) / minRange);
  };

  const getTime=(date)=>{
    let minutes = ("0" + date.getMinutes()).slice(-2);
    return date.getHours()+":"+minutes;
  };

  const isScheduleEmpty = ()=>{
    return !mySchedules || mySchedules.length===0;
  };

  const addCustomEvent=async (e)=>{
    e.preventDefault();

    if(!customEvent.title || customEvent.title==="")
      return setErrorMsg("Por favor colócale un título a tu evento");
    
    if(!customEvent.dateStart)
      return setErrorMsg("Por favor asigna una fecha de inicio a tu evento");
    
    if(!customEvent.dateEnd)
      return setErrorMsg("Por favor asigna una fecha de fin a tu evento");

    if(!validDates(customEvent.dateStart,customEvent.dateEnd))
      return;
    
    customEvent.timeStart=getTime(customEvent.dateStart);
    customEvent.timeEnd=getTime(customEvent.dateEnd);
  

    customEvent.indexStart=calculateIndex(customEvent.timeStart);
    customEvent.indexEnd=calculateIndex(customEvent.timeEnd);

    await updateEvent(customEvent);
    deactivateModal();
  };

  const modalFormBody=(
    <form className="modal__form" noValidate onSubmit={addCustomEvent}>
      <input
        type="text"
        placeholder="Nombre del evento"
        onChange={e => {customEvent.title=e.target.value;setCustomEvent(customEvent);}}
        className="modal__form__input"
      />
      <textarea
        placeholder="Descripción"
        rows={4}
        value={customEvent.description}
        onChange={e => {customEvent.description=e.target.value;setCustomEvent(customEvent);}}
        className="modal__form__input modal__form__input"
      />
      <input
        type="text"
        placeholder="Lugar del evento"
        onChange={e => {customEvent.place=e.target.value;setCustomEvent(customEvent);}}
        className="modal__form__input"
      />

      <label htmlFor="start-date">Fecha de inicio</label>
      <Flatpickr data-enable-time
        name="start-date"
        placeholder="Fecha de inicio"
        options={{minDate:"2019-01-01",minuteIncrement:30}}
        value={customEvent.dateStart}
        onChange={date => { customEvent.dateStart=new Date(date);setCustomEvent(customEvent); }} 
        className="modal__form__input modal__form__input--calendar"
      />

      <label htmlFor="end-date">Fecha de fin</label>
      <Flatpickr data-enable-time
        name="end-date"
        placeholder="Fecha de fin"
        options={{minDate:"2019-01-01",minuteIncrement:30}}
        value={customEvent.dateEnd}
        onChange={date => { customEvent.dateEnd=new Date(date);setCustomEvent(customEvent); }} 
        className="modal__form__input modal__form__input--calendar"
      />

      {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
      <div className="modal__form__buttons">
        <button
          onClick={()=>deactivateModal()}
          className="modal__form__button modal__form__button--cancel"
        >
          Cancelar
        </button>
        <button
          className="modal__form__button modal__form__button--ok"
          type="submit"
        >
          Crear
        </button>
      </div>
    </form>
  );
  
  return (
    <div className="scheduleBodyContainer">
      <div className={`scheduleBody ${isScheduleEmpty()?"scheduleBody--disabled":""}`}>
        {Array.apply(null, { length: maxRows }).map((_, i) => (
          <div className="scheduleBody__row" key={i}>
            {Array.apply(null, { length: maxCols }).map((_, j) => (
              <div 
                className={`scheduleBody__cell ${isScheduleEmpty()?"scheduleBody__cell--disabled":""}`} 
                key={j} onClick={()=>activateModal(i,j-1)} >
                {j === 0 && i % 2 === 0 ? <p className={`scheduleBody__hour ${isScheduleEmpty()?"scheduleBody__hour--disabled":""}`}>{i / 2 + 6}</p> : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      <ActionModal ref={addCustomEventModal}
        modalHeaderColor="white"
        modalHeaderTitle="Agregar mi evento"
        modalBody={modalFormBody}
        okCBK={() => {addCustomEvent();}}
        cancelCBK={()=>{deactivateModal();}}/>
    </div>
    
  );
}

export default ScheduleBody;
