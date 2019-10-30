import React from "react";
import Search from "../../components/search/Search"

import { withRouter } from "react-router-dom";

function SearchPage() {
  return (
    <div>
        <Search/>
    </div>
  );
}


export default withRouter(SearchPage);