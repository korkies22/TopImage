import React,{useState,useRef} from "react";
//import "./Search.scss";

import {useSelector} from "react-redux";

import Filter from "./filter/Filter";

function Search() {
    const useContests = () =>
      useSelector(state => state.contests.contests, []);
    const contests=useContests();

    return(
        <div className="search">
            <Filter contests={contests} hasDate={true}></Filter>
        </div>
    )
}

export default Search;