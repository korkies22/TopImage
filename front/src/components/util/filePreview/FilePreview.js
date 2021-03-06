/*eslint no-undef: "error"*/

import React, { useEffect, useState } from "react";
import "./FilePreview.scss";

import PropTypes from "prop-types";

function FilePreview(props) {
  const [imagePreview, setImagePreview] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    setImagePreview(null);
    setVideo(null);

    const getFileType = () => {
      return props.file.type;
    };

    const isImage = () => {
      const type = getFileType();
      return /(jpe?g|png|gif|bmp|svg)$/i.test(type);
    };

    if (
      getFileType().match("video.*") &&
      /\.(webm|ogg|mp4)$/i.test(props.file.name)
    ) {
      const video = window.URL.createObjectURL(props.file);
      setVideo(video);
    } else if (isImage()) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(props.file);
    }
  }, [props.file]);

  const render = () => {
    let item;
    if (imagePreview) {
      item = (
        <img
          src={imagePreview}
          className="filePreview__image"
          alt={props.file.name}
        />
      );
    } else if (video) {
      item = (
        <video
          controls
          className="filePreview__video"
          src={video + "#t=0.1"}
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload"
        ></video>
      );
    } else {
      item = <p>Incompatible file type</p>;
    }
    return item;
  };

  return (
    <div className="filePreview">
      <div className="filePreview__content">
        <div className="filePreview__file">{render()}</div>
        <p className="filePreview__remove" onClick={()=>props.removeFile()}>X</p>
      </div>
      <p className="filePreview__name">{props.file.name}</p>
    </div>
  );
}

FilePreview.propTypes = {
  file:PropTypes.shape({
    type:PropTypes.string,
    name: PropTypes.string
  }),
  removeFile: PropTypes.func
};

export default FilePreview;
