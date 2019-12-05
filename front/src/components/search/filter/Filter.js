/* eslint-disable no-undef */

import React, { useState, useEffect,useCallback,useRef } from "react";
import { useSelector } from 'react-redux';

import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";

import PropTypes from "prop-types";

import "../../actions/Flatpickr.scss";
import Flatpickr from "react-flatpickr";

function Filter(props) {
  const [contestFilter, setContestFilter] = useState(
    props.contests);
    const email = useSelector(state =>
      state.auth.user ? state.auth.user.email : ''
    );

  const [filtered, setFiltered] = useState(false);
  const [filterDates, setFilterDates] = useState([]);
  const [filterActive, setFilterActive] = useState(true);
  const [filterOwn, setFilterOwn] = useState(false);
  const [filterString, setFilterString] = useState("");

  const refDatePicker = useRef(null);

  const clearDates=()=>{
    if(refDatePicker.current)
      refDatePicker.current.flatpickr.clear();
  }

  const filter = useCallback(()=> {
    setFiltered(true);
    let tempFilter = props.contests.filter(c => {
      let filterAnswer =
        c.name.includes(filterString) ||
        (c.topic && c.topic.includes(filterString)) ||
        c.username.startsWith(filterString);

      let date = new Date(c.endDate);
      if (props.hasDate && filterDates && filterDates.length >= 2) {
        filterAnswer =
          filterAnswer &&
          (new Date(filterDates[0]).getTime() <= date.getTime() &&
            date.getTime() <= new Date(filterDates[1]).getTime());
      }

      if (filterActive) {
        filterAnswer = filterAnswer && new Date().getTime() <= date.getTime();
      }

      if (filterOwn) {
        filterAnswer = filterAnswer && c.username ===  email;
      }

      return filterAnswer;
    });

    setContestFilter(tempFilter);
  },[filterActive, filterDates, filterString,props.contests,filterOwn,props.hasDate]);

  const mapContests = data => {
    return data.map((el, index) => (
      <SearchItem key={el._id} element={el} index={index}></SearchItem>
    ));
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  useEffect(() => {
    filter(null,true,null);
  }, [props.contests,filter]);

  return (
    <div className="filter">
      <div className="filter__criteria">
        <div className="filter__searchBar">
          <img
            className="filter__searchBar__searchIcon"
            src={require("../../../assets/icons/magnifying-glass.svg")}
            alt="search-icon"
          />
          <input
            className="filter__searchBar__searchInput"
            aria-label="Search"
            type="text"
            placeholder="Search by contest title..."
            onChange={(e)=>setFilterString(e.target.value)}
          />
        </div>

        {props.hasDate ? (
          <div className="filter__actions">
            <div className="filter__group">
              <Flatpickr
                name="date"
                ref={refDatePicker}
                aria-label="Select date"
                placeholder="Filter dates"
                options={{
                  minDate: formatDate(new Date()),
                  minuteIncrement: 10,
                  mode: "range",
                }}
                value={filterDates}
                onChange={dates => {
                  setFilterDates(dates);
                }}
                className="filter__input filter__input--calendar"
              />
              {filterDates && filterDates.length>0?<p className="filter__remove" onClick={()=>clearDates()}>X</p>:null}
              
            </div>
            
            <div className="filter__group">
              <label>
                <input
                  type="radio"
                  checked={filterActive}
                  onChange={()=>setFilterActive(true)}
                />
                Ongoing contests
              </label>
              <label>
                <input
                  type="radio"
                  checked={!filterActive}
                  onChange={()=>setFilterActive(false)}
                />
                Already finished
                
              </label>
            </div>
            
          </div>
        ) : null}
      </div>

      <div className="filter__tabs">
        <button 
          className={`filter__tab filter__tab--left
           ${filterOwn?'':'filter__tab--active'}`}
           onClick={()=>setFilterOwn(false)}>All contests</button>
        <button 
          className={`filter__tab filter__tab--right
          ${filterOwn?'filter__tab--active':''}`}
          onClick={()=>setFilterOwn(true)}>My contests</button>
      </div>

      <div className="filter__contests">
        {filtered || contestFilter.length > 0
          ? mapContests(contestFilter)
          : mapContests(props.contests)}
      </div>
    </div>
  );
}

Filter.propTypes = {
  contests: PropTypes.array,
  hasDate: PropTypes.bool,
};

export default Filter;
