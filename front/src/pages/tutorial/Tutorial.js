/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./tutorial.scss";

const tutorialItems = [
  {
    title: "Sign up",
    description:
      "Sign up to TopImage to create contests or see previous contests created by others",
  },
  {
    title: "Create a contest",
    description:
      "Click on the New Top Image button to create your own contest",
  },
  {
    title: "Choose contest options",
    description:
      "Choose a name and topic for your contest. Select also an end date for it. Finally, you can add your own images or let the app choose their own's based on the topic",
  },
  {
    title: "View contests",
    description:
      "See all the current running contests in the grid below",
  },
  {
    title: "Search",
    description:
      "Use the search bar to filter contests by name. You can also choose a range of dates and whether the contest has finished or not",
  },
  {
    title: "Go into a contest",
    description: "Click on a contest preview to go into its details",
  },
  {
    title: "Select an image",
    description:
      "Select an image you like from the list on the left to see it bigger and be able to rate it",
  },
  {
    title: "Rate an image",
    description:
      "Use the like and dislike options below to rate the image",
  },
];
function Tutorial(props) {
  return (
    <div className="tutorial">
      <h1 className="tutorial__title">Tutorial</h1>
      <button
        className="tutorial__button"
        onClick={() => props.history.push("/")}
      >
        Go to main
      </button>

      <div className="tutorial__list">
        {tutorialItems.map((item, index) => (
          <div className="tutorial__item" key={index}>
            <hr />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img
              src={require("../../assets/tuto/tuto" + (index + 1) + ".png")}
              alt="Tutorial step"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Tutorial.propTypes = {
  history: PropTypes.any,
};

export default withRouter(Tutorial);
