/* eslint-disable no-undef */
import React,{useState} from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";
import { useSelector } from "react-redux";

function Filter() {
  const events = useSelector(state => state.events.events);
  const [eventFilter, setEventFilter] = useState(events);
  const [filtered, setFiltered] = useState(false);

  const filter=(event)=>{
    setFiltered(true);
    let tempFilter=events.filter((ev)=>{
      let val=event.target.value;
      return ev.title.includes(val) || ev.type.includes(val);
    });
    setEventFilter(tempFilter);
  };

  const mapEvents=(data)=>(
    data.map(el => <SearchItem key={el._id} element={el}></SearchItem>)
  );

  return (
    <div className="filter">
      <div className="filter__searchBar">
        <img
          className="filter__searchBar__searchIcon"
          src={require("../../../assets/icons/magnifying-glass.svg")}
          alt="search-icon"
        />
        <input className="filter__searchBar__searchInput" type="text" placeholder="Buscar..." onChange={filter}/>
      </div>


      <div className="filter__events">
        {filtered || eventFilter.length>0?mapEvents(eventFilter):mapEvents(events)}
      </div>
      
    </div>
  );
}

export default Filter;
