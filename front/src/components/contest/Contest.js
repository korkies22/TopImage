/*global require*/
/*eslint no-undef: "error"*/

import React, { useEffect, useState, useMemo,useRef } from 'react';
import { useSelector } from 'react-redux';
import './Contest.scss';
import axios from 'axios';

import PropTypes from 'prop-types';

function Contest(props) {
  const contest = useSelector(state => state.contests.curContest);
  const token = useSelector(state => state.auth.token);
  const email = useSelector(state =>
    state.auth.user ? state.auth.user.email : ''
  );
  const url = useSelector(state => state.root.url);

  const accessKeyText= useRef(null);
  const featuredRef= useRef(null);

  const sortedImages = useMemo(() => {
    const compareImagesByLikes = (item1, item2) => {
      return (
        (item2.likes || 0) +
        (item1.dislikes || 0) -
        (item1.likes || 0) -
        (item2.dislikes || 0)
      );
    };
    return [...contest.images].sort(compareImagesByLikes);
  }, [contest.images]);

  const [curImage, setCurImage] = useState(sortedImages[0]);

  useEffect(() => {
    if (curImage && sortedImages) {
      const curContestIndex = sortedImages.findIndex(
        item => item.url === curImage.url
      );
      setCurImage(sortedImages[curContestIndex]);
    } else {
      setCurImage(sortedImages[0]);
    }
  }, [sortedImages,curImage]);

  const parseDate = dateP => {
    const date = new Date(dateP);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  };

  const getImageIndex = () => {
    return contest.images.findIndex(item => item.url === curImage.url);
  };

  const likePost = async isDislike => {
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = { isDislike: isDislike };
    try {
      await axios.post(
        `${url}contests/${props.contestId}/images/${getImageIndex()}/likes`,
        body,
        options
      );
    } catch (err) {
      console.log(err);
    }
  };

  const curImageSet = url => {
    const index = contest.images.findIndex(item => item.url === url);
    setCurImage(contest.images[index]);
    scrollToRef(featuredRef);
  };

  const hasLiked = () => {
    return (curImage.likedBy || []).findIndex(item => item === email) !== -1;
  };

  const hasDisliked = () => {
    return (curImage.dislikedBy || []).findIndex(item => item === email) !== -1;
  };

  const copyAccessKey = ()=>{
    accessKeyText.current.select();
    document.execCommand("copy");

    accessKeyText.current.setSelectionRange(0, 0);
    accessKeyText.current.blur(); 
  };

  const renewAccessKey = async ()=>{
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await axios.put(
        `${url}contests/${props.contestId}/accessKey`,{},
        options
      );
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-100) 

  return (
    <div className="contest">
      {
        // Action buttons for creator
        contest && contest.private==="1" && email === contest.username? 
        <div className="contest__actions">
          <textarea
            readOnly 
            ref={accessKeyText}
            value={contest.accessKey}
          />
          
          <button className="contest__button" onClick={()=>copyAccessKey()}>
            <img src={require("../../assets/icons/link.svg")} alt="Copy AccessKey button"/>
          </button>
          <button className="contest__button" onClick={()=>renewAccessKey()}>
            <img src={require("../../assets/icons/autorenew.svg")} alt="Renew AccessKey button"/>
          </button>
        </div> : null
      }
      
      {/* COntent */}
      <h2 className="contest__name">{contest ? contest.name : null}</h2>
      <div className="contest__header">
        <p>Topic: {contest.topic}</p>
        <p>End Date: {parseDate(contest.endDate)}</p>
      </div>
      <div className="contest__main">
        <div className="contest__list">
          <h2 className="contest__listName">Contest images</h2>
          {sortedImages.map(el => (
            <div className="contest__preview" key={el.url}>
              <button
                className="contest__card"
                style={{ backgroundImage: 'url(' + el.url + ')' }}
                aria-label="button"
                onClick={() => curImageSet(el.url)}
              ></button>
              <p className="contest__preview--likes">
                Score: {el.likes - el.dislikes}
              </p>
            </div>
          ))}
        </div>
        {curImage ? (
          <div className="contest__featured" ref={featuredRef}>
            <div
              className="contest__card contest__card--main"
              style={{ backgroundImage: 'url(' + curImage.url + ')' }}
            ></div>
            <div className="contest__like">
              <button
                className="contest__icon"
                alt="likes for item"
                aria-label="like"
                tabIndex="0"
                style={{'backgroundImage':'url('+require(`../../assets/icons/like${
                  hasLiked() ? '' : 'U'
                }.svg`)+')'}}
                onClick={() => likePost(false)}
              ></button>
              <button
                className="contest__icon"
                aria-label="dislike"
                alt="dislikes for item"
                style={{'backgroundImage':'url('+require(`../../assets/icons/dislike${
                  hasDisliked() ? '' : 'U'
                }.svg`)+')'}}
                onClick={() => likePost(true)}
              ></button>
              <p className="contest__numLikes">
                {curImage.likes - curImage.dislikes}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

Contest.propTypes = {
  contestId: PropTypes.string,
};

export default Contest;
