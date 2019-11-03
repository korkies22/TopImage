/*global require*/
/*eslint no-undef: "error"*/

import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "./Contest.scss";
import axios from "axios";

import PropTypes from "prop-types";

function Contest(props) {
  const contest = useSelector(state => state.contests.curContest);
  const token = useSelector(state => state.auth.token);
  const email = useSelector(state => state.auth.user.email);
  const url = useSelector(state => state.root.url);

  const sortedImages = useMemo(() => {
    const compareImagesByLikes = (item1, item2) => {
      return (item2.likes || 0) + (item1.dislikes || 0) - (item1.likes || 0) - (item2.dislikes || 0);
    };
    return [...contest.images].sort(compareImagesByLikes);
  });

  const [curImage, setCurImage] = useState(sortedImages[0]);


  useEffect(() => {
    setCurImage(sortedImages[0]);
  }, [contest,sortedImages]);

  const parseDate = (dateP) => {
    const date = new Date(dateP);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const getImageIndex = () => {
    return contest.images.findIndex((item) => item.url === curImage.url);
  };

  const likePost = async (isDislike) => {
    const options = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const body = { isDislike: isDislike };
    try {
      await axios.post(`${url}contests/${props.contestId}/images/${getImageIndex()}/likes`,
        body, options);
    }
    catch (err) {
      console.log(err);
    }
  };

  const curImageSet = (url) => {
    const index = contest.images.findIndex((item) => item.url === url);
    setCurImage(contest.images[index]);
    
  };

  const hasLiked = () => {
    return (curImage.likedBy || []).findIndex((item) => item === email) !== -1;
  };

  const hasDisliked = () => {
    return (curImage.dislikedBy || []).findIndex((item) => item === email) !== -1;
  };
  return (
    <div className="contest">
      <h2 className="contest__name">{contest ? contest.name : null}</h2>
      <div className="contest__header">
        <p>Topic: {contest.topic}</p>
        <p>End Date: {parseDate(contest.endDate)}</p>
      </div>
      <div className="contest__main">
        <div className="contest__list">
          {sortedImages.map((el) =>
            <div className="contest__preview" key={el.url}>
              <button className="contest__card" style={{ "backgroundImage": "url(" + el.url + ")" }} aria-label="button" onClick={() => curImageSet(el.url)}></button>
              <p className="contest__preview--likes">Score: {el.likes - el.dislikes}</p>
            </div>
          )}
        </div>
        {curImage?
          <div className="contest__featured">
            <div className="contest__card contest__card--main" style={{ "backgroundImage": "url(" + curImage.url + ")" }}></div>
            <div className="contest__like">
              <img className="contest__icon" alt="likes for item" src={require(`../../assets/icons/like${hasLiked() ? "" : "U"}.svg`)} onClick={() => likePost(false)}></img>
              <img className="contest__icon" alt="dislikes for item" src={require(`../../assets/icons/dislike${hasDisliked() ? "" : "U"}.svg`)} onClick={() => likePost(true)}></img>
              <p className="contest__numLikes">{curImage.likes - curImage.dislikes}</p>
            </div>
          </div>
          :null}
      </div>
    </div>
  );
}

Contest.propTypes = {
  contestId: PropTypes.string
};

export default Contest;