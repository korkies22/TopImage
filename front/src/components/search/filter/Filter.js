/* eslint-disable no-undef */
import React,{useState} from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";

function Filter(props) {

  console.log("CONTESTS",props.contests);

  const [contestFilter, setContestFilter] = useState(props.contests);
  const [filtered, setFiltered] = useState(false);

  const filter=(event)=>{
    setFiltered(true);
    let tempFilter=props.contests.filter((c)=>{
      let val=event.target.value;
      return c.name.includes(val) || c.topic.includes(val);
    });
    setContestFilter(tempFilter);
  };

  const mapContests=(data)=>{
    console.log("DATA",data);
    return data.map(el => <SearchItem key={el._id} element={el}></SearchItem>)
  };

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

      <div className="filter__contests">
        {filtered || contestFilter.length>0?mapContests(contestFilter):mapContests(props.contests)}
      </div>
      
    </div>
  );
}

export default Filter;