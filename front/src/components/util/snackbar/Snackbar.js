import React from "react";
import "./Snackbar.scss";

import PropTypes from "prop-types";

function CustomSnackbarComponent({ message }) {
  return (
    <div className="snackbar"
    >
      {message}
    </div>
  );
}

CustomSnackbarComponent.propTypes={
  message: PropTypes.string
};

export default CustomSnackbarComponent;