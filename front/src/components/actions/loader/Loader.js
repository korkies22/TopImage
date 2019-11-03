import React from "react";
import "./Loader.scss";

const Loader = ()=>{

  return (
    <div className="lds">
      <div className="lds-backdrop"></div>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader;