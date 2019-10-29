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
    })

    return src;
  }

  const goToDetail=(id)=>{
    history.push(`contests/${id}`);
  }

  return (
    <div className={`search-item`} onClick={()=>{goToDetail(props.element._id)}}>
      <div className="search-item__container">
        <span className="search-item__num">X{props.element.images.length}</span>
      </div>
      <img className="search-item__img" src={topImage(props.element.images)} alt="Top image of the contest so far">
      </img>
      {/*Text*/}
      <h4 className="search-item__date">{props.element.endDate}</h4>
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
  element:PropTypes.any
};

export default SearchItem;
