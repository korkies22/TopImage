/*eslint no-undef: "error"*/

import React from 'react';
import './FilePreviewList.scss';

import FilePreview from '../filePreview/FilePreview';

function FilePreviewList(props) {

  return (
    <div className="filePreviewList">
      {props.files.map((item,index) => (
        <FilePreview
          file={item}
          key={item.name + item.lastModified}
          removeFile={()=>props.removeFile(index)}
        ></FilePreview>
      ))}
    </div>
  );
}

export default FilePreviewList;
