/* eslint-disable no-undef */

import React, { useState, useEffect,useCallback } from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";

import PropTypes from "prop-types";

import "../../actions/Flatpickr.scss";
import Flatpickr from "react-flatpickr";

function Filter(props) {
  const [contestFilter, setContestFilter] = useState(props.contests);
  const [filtered, setFiltered] = useState(false);
  const [filterDates, setFilterDates] = useState([]);
  const [filterActive, setfilterActive] = useState(true);
  const [filterString, setFilterString] = useState("");

  const filter = useCallback((event, isActive, dates) => {
    setFiltered(true);
    let val = event && event !== null ? event.target.value : filterString;
    dates=dates?dates:filterDates;
    isActive=isActive!==undefined && isActive!==null?isActive:filterActive;

    let tempFilter = props.contests.filter(c => {
      let filterAnswer =
        c.name.includes(val) ||
        c.topic.includes(val) ||
        c.username.startsWith(val);

      let date = new Date(c.endDate);
      if (props.hasDate && dates && dates.length >= 2) {
        filterAnswer =
          filterAnswer &&
          (new Date(dates[0]).getTime() <= date.getTime() &&
            date.getTime() <= new Date(dates[1]).getTime());
      }

      if (isActive) {
        filterAnswer = filterAnswer && new Date().getTime() <= date.getTime();
      }

      return filterAnswer;
    });

    setfilterActive(isActive);
    setFilterDates(dates);
    setFilterString(val);

    setContestFilter(tempFilter);
  },[filterActive, filterDates, filterString, props.contests, props.hasDate]);

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
            placeholder="Search..."
            onChange={filter}
          />
        </div>

        {props.hasDate ? (
          <div className="filter__actions">
            <Flatpickr
              data-enable-time
              name="date"
              aria-label="Select date"
              placeholder="Filter dates"
              options={{
                minDate: formatDate(new Date()),
                minuteIncrement: 10,
                mode: "range",
              }}
              value={filterDates}
              onChange={dates => {
                filter(null, null, dates);
              }}
              className="modal__form__input modal__form__input--calendar"
            />
            <label>
              Ongoing
              <input
                type="checkbox"
                checked={filterActive}
                onChange={()=>{filter(null,!filterActive,null);}}
              />
            </label>
          </div>
        ) : null}
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
