/* eslint-disable no-undef */
import React,{useState} from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";

import "../../actions/Flatpickr.scss";
import Flatpickr from "react-flatpickr";

function Filter(props) {
  const [contestFilter, setContestFilter] = useState(props.contests);
  const [filtered, setFiltered] = useState(false);
  const [filterDates, setFilterDates] = useState([]);

  const filter=(event,dates)=>{
    setFiltered(true);
    let tempFilter=props.contests.filter((c)=>{
      let val=event || event===null?event.target.value:"";
      let filterAnswer= c.name.includes(val) || c.topic.includes(val) || c.username.startsWith(val);
      console.log("Filter dates",dates,props.hasDate);
      if(props.hasDate && dates.length>=2)
      {
        let date=new Date(c.endDate);
        console.log("Current Date",c.endDate)
        filterAnswer=filterAnswer && (new Date(filterDates[0]).getTime()<=date.getTime() && date.getTime()<=new Date(filterDates[1]).getTime());
      }
      return filterAnswer;
    });
    setContestFilter(tempFilter);
  };

  const mapContests=(data)=>{
    console.log("DATA",data);
    return data.map(el => <SearchItem key={el._id} element={el}></SearchItem>)
  };

  const formatDate=(date)=>{
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  };

  return (
    <div className="filter">
      <div className="filter__criteria">
        <div className="filter__searchBar">
          <img
            className="filter__searchBar__searchIcon"
            src={require("../../../assets/icons/magnifying-glass.svg")}
            alt="search-icon"
          />
          <input className="filter__searchBar__searchInput" type="text" placeholder="Buscar..." onChange={filter}/>
        </div>

        {props.hasDate?<Flatpickr data-enable-time
              name="date"
              placeholder="Filter dates"
              options={{minDate:formatDate(new Date()),minuteIncrement:30,mode:'range'}}
              value={filterDates}
              onChange={dates => {console.log("Change dates",dates);filter(null,dates); }} 
              className="modal__form__input modal__form__input--calendar"
          />:null}
      </div>
      

      <div className="filter__contests">
        {filtered || contestFilter.length>0?mapContests(contestFilter):mapContests(props.contests)}
      </div>
      
    </div>
  );
}

export default Filter;
