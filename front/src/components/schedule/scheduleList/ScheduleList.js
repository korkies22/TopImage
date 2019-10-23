/* eslint-disable no-undef */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSchedules, setCurrentSchedule } from "../../../store/schedules/actions";
import "./ScheduleList.scss";

import ActionModal from "../../actions/actionModal/ActionModal";
import "../../actions/actionModal/ActionModal.scss";

import axios from "axios";

function ScheduleList() {
// Delete op
  const url = useSelector(state => state.root.url);
  const token=useSelector(state=>state.auth.token);
  const user=useSelector(state=>state.auth.user);

  // Schedules
  const useSchedules = () =>
    useSelector(state => state.schedules.schedules, []);
  const mySchedules=useSchedules();
  
  const useCurrentSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule=useCurrentSchedule();

  const findScheduleIndex=()=>{
    const index= mySchedules.findIndex((item)=>{ return item._id && item._id.toString()===currentSchedule._id.toString();});
    return index;
  };
  const selected= findScheduleIndex();
  const dispatch = useDispatch();

  const setSelectedSchedule=(index)=>{
    dispatch(setCurrentSchedule(mySchedules[index]));
  };

  // Actions
  const errorModal=useRef(null);
  const addScheduleModal=useRef(null);
  const deleteModal = useRef(null);
  const showDeleteModal = (index) => {
    setSelectedSchedule(index);
    // `current` apunta al elemento de entrada de texto montado
    deleteModal.current.toggle();
  }; 

  const deleteSchedule=async ()=>{
    try
    {
      const id=mySchedules[selected]._id;
      const tempSchedules=[...mySchedules];
      tempSchedules.splice(selected,1);

      const options={
        headers:{Authorization:`Bearer ${token}`}
      };
      await axios.delete(`${url}users/${user._id}/schedules/${id}`,
        options);
      dispatch(setSchedules(tempSchedules,0));
    }
    catch(e)
    {
      console.log(e);
      errorModal.current.toggle();
    }
  };

  // Add Schedule
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const addSchedule=async (e)=>{
    e.preventDefault();

    if (!title)
      return setErrorMsg(
        "Debe ingresar un título para su horario"
      );
    try
    {
      let schedule={
        title:title,
        description:description
      };
      const options={
        headers:{Authorization:`Bearer ${token}`}
      };
      const res=await axios.post(`${url}users/${user._id}/schedules`,
        schedule,options);
      dispatch(setSchedules(res.data.value.schedules,0));
      addScheduleModal.current.toggle();
    }
    catch(e)
    {
      console.log(e);
      errorModal.current.toggle();
    }
  };

  const addScheduleModalForm=(
    <form className="modal__form" noValidate onSubmit={addSchedule}>
      <input
        type="text"
        placeholder="Nombre del horario"
        value={title.value}
        onChange={e => setTitle(e.target.value)}
        className="modal__form__input"
      />
      <textarea
        placeholder="Descripción"
        rows={4}
        value={description.value}
        onChange={e => setDescription(e.target.value)}
        className="modal__form__input"
      />
      {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
      
      <div className="modal__buttons">
        <button
          onClick={()=>{addScheduleModal.current.toggle();}}
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
  

  // Render
  const mapScheduleList=mySchedules.map((el,index)=>(
    <div className={`scheduleList__item scheduleList__item${selected===index?"--selected":""}`} key={index} onClick={()=>setSelectedSchedule(index)}>
      <button className="scheduleList__item__delete">
        <img alt="Delete icon" 
          src = {require("../../../assets/icons/delete.svg")}
          onMouseOver={e => e.currentTarget.src = require("../../../assets/icons/delete-red.svg")}
          onMouseOut={e => e.currentTarget.src = require("../../../assets/icons/delete.svg")}
          onClick={()=>showDeleteModal(index)}
        />
      </button>
      <h2 className="scheduleList__item__title">{el.title}</h2>
      <p className="scheduleList__item__description">{el.description}</p>
      <span className="scheduleList__item__arrow">&gt;</span>
    </div>
  ));

  return (
    <div className="scheduleList__container">

      {/*Schedule list sidebar*/}
      <div className="scheduleList">
        <button className="scheduleList__add" onClick={()=>addScheduleModal.current.toggle()}>
          Nuevo horario
          <img src={require("../../../assets/icons/add.svg")} alt="Add new schedule"/>
        </button>
        <div className="scheduleList__list">
          {mapScheduleList}
        </div>
      </div>

      {/*Add Schedule*/}
      <ActionModal ref={addScheduleModal}
        modalHeaderColor="white"
        modalHeaderTitle="Agregar Nuevo Horario"
        modalBody={addScheduleModalForm}
        okCBK={(e) => addSchedule(e)}
        cancelCBK={() => { }} />

      {/*Delete Schedule*/}
      <ActionModal ref={deleteModal}
        modalHeaderBg="#EE2E31"
        modalHeaderColor="white"
        modalHeaderTitle="Borrar Horario"
        modalBody="¿Estás seguro de que quieres borrar este horario?"
        okCBK={() => deleteSchedule(selected)}
        okText="Borrar"
        cancelCBK={() => { }}
        cancelText="Cancelar" />

      {/*Error*/}
      <ActionModal ref={errorModal}
        modalHeaderBg="#EE2E31"
        modalHeaderColor="white"
        modalHeaderTitle="Error"
        modalBody="Hubo un error ejecutando la app, por favor intente más tarde"
        okCBK={() => { }}
        okText="OK" />
    </div>
  );
}

export default ScheduleList;
