/*eslint no-undef: "error"*/

import React from 'react';
import './FilePreviewList.scss';

import FilePreview from '../filePreview/FilePreview';

function FilePreviewList(props) {

  return (
    <div className="filePreviewList">
      {props.files.map(item => (
        <FilePreview
          file={item}
          key={item.name + item.lastModified}
        ></FilePreview>
      ))}
    </div>
  );
}

export default FilePreviewList;
