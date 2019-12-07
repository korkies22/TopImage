/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './tutorial.scss';

const tutorialItems = [
  {
    title: 'Sign up',
    description:
      'Sign up to TopImage to create contests or see previous contests created by others',
  },
  {
    title: 'Create a contest',
    description: 'Click on the New Top Image button to create your own contest',
  },
  {
    title: 'Mandatory contest setup',
    description: 'Choose a name and end date for your contest.',
  },
  {
    title: 'Contest options',
    description:
      "You then have three more options: Upload your own multimedia with the 'Add multimedia button', complete your contest" +
      ' with random images based on a topic and quantity, and make your contest private (only you can give access) or public.' +
      " Finally click on the 'Top Image' button to start the contest",
  },
  {
    title: 'View contests',
    description:
      'See all the current running contests in the grid below. Also go back and forth between all the contests and the ones you created with the purple tabs on top.',
  },
  {
    title: 'Search',
    description:
      'Use the search bar to filter contests by name. You can also choose a range of dates and whether the contest has ended or not',
  },
  {
    title: 'Go into a contest',
    description: 'Click on a contest preview to go into its details',
  },
  {
    title: 'Select an image',
    description:
      'Select an image you like from the list on the left to see it bigger and be able to rate it',
  },
  {
    title: 'Rate an image',
    description: 'Use the like and dislike options below to rate the image',
  },
  {
    title: 'Share your private contest',
    description:
      'If your contest is private, you can copy the unique code on the top right corner to send it ' +
      'to your friends so that they can rate it (first button) or create a new code (second button)',
  },
];
function Tutorial(props) {
  return (
    <div className="tutorial">
      <h1 className="tutorial__title">Tutorial</h1>
      <button
        className="tutorial__button"
        onClick={() => props.history.push('/')}
      >
        Go to main
      </button>

      <h2>What is this all about?</h2>
      <p>
        Top Image allows you to create contests. Each contest hold certain
        images which people can vote, to select the best one <br></br><br></br>
        You can create public or private contests, and even complete with random
        images if you want to
      </p>

      <ul id="menu">
      {tutorialItems.map((item, index) => (
          <li><a href={`#item${index}`}>{item.title}</a></li>
        ))}
      </ul>

      <div className="tutorial__list">
        {tutorialItems.map((item, index) => (
          <div className="tutorial__item" key={index} id={`item${index}`}>
            <hr />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img
              src={require('../../assets/tuto/tuto' + (index + 1) + '.png')}
              alt="Tutorial step"
            />
            <a href="#menu" className="tutorial__backToMenu">Back to menu</a>
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
