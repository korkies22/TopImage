import React, { forwardRef } from "react";
import "./Occurrence.scss";
import { getHash } from "../../../../../util/events/events";
import { rowGap, colGap } from "../../../../../util/grid/grid";

import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const Ocurrence = forwardRef((props, ref) => {
  const colorsLength = 6;

  return (
    <div
      ref={ref}
      className={`occurrence occurrence--color${Math.abs(getHash(props.element.type)) % colorsLength}
       ${props.element.isTemp ? "isTemp" : ""}
       ${props.element.overlap ? "overlap" : ""}`}
      style={{
        gridRowStart: props.element.indexStart + rowGap,
        gridRowEnd: props.element.indexEnd + rowGap,
        gridColumnStart: props.element.days[0] + colGap
      }}
    >
      <button className="occurrence__close" onClick={props.eliminateOccurrence}>&times;</button>
      <h4 className="occurrence__title">{props.element.title}</h4>
      <h6 className="occurrence__place">{props.element.place}</h6>
    </div>
  );
});

Ocurrence.propTypes = {
  element: PropTypes.any,
  eliminateOccurrence: PropTypes.any
};

export default Ocurrence;
