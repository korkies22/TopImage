import React from "react";
import "./SearchItem.scss";

import { useHistory } from "react-router-dom";


import PropTypes from "prop-types";


function SearchItem(props) {
  let history = useHistory();

  const topImage=(images)=>{
    let likes=0;
    let src=images[0].url;

    images.forEach(el=>{
      if (el.likes>likes)
      {
        likes=el.likes;
        src=el.url;
      }
    });

    return src;
  };
  const formatDate=(date)=>{
    if(!date)
      return date;
    date=new Date(date);
    let hours=date.getHours();
    let mins=date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";  
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours=hours<10?"0"+hours:hours;
    mins=mins<10?"0"+mins:mins;
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${hours}:${mins} ${ampm}`;
  };

  const goToDetail=(id)=>{
    history.push(`contests/${id}`);
  };

  
  const buildHandleEnterKeyPress = (onClick) => ({ key }) => {
    if (key === "Enter") { 
      onClick(); 
    }
  };

  return (
    <div className="search-item" 
      onClick={()=>{goToDetail(props.element._id);}} 
      onKeyPress={buildHandleEnterKeyPress(()=>goToDetail(props.element._id))}
      role="button">
      <div className="search-item__container">
        <span className="search-item__num">X{props.element.images.length}</span>
      </div>
      <img className="search-item__img" src={topImage(props.element.images)} alt="Best item of the contest so far">
      </img>
      {/*Text*/}
      <h2 className="search-item__date">{formatDate(props.element.endDate)}</h2>
      <div className="search-item__group">
        <p className="search-item__text">
          {props.element.username} {props.element.name}
        </p>
        <p className="search-item__arrow">►</p>
      </div>
    </div>
  );
}

SearchItem.propTypes={
  element:PropTypes.object,
  index: PropTypes.number
};

export default SearchItem;
