import React from "react";
import "./Snackbar.scss";
export default function CustomSnackbarComponent({ message }) {
  return (
    <div className="snackbar"
    >
      {message}
    </div>
  );
}