import React from "react";
import Search from "../../components/search/Search"
import "./Search.scss";

import { withRouter } from "react-router-dom";

function SearchPage() {
  return (
    <div className="search-page">
        <div className="search__bg"></div>
        <Search/>
    </div>
  );
}


export default withRouter(SearchPage);