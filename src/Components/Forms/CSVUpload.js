import React from 'react'
import { CSVReader } from 'react-papaparse';
export default function CSVUpload(props) {
    console.log(props)
    const handleOnDrop = (data) => {
        props.setData(data)
      };
    
      const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
      };
    
      const handleOnRemoveFile = (data) => {
      };
    return (
        <div>
            <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          noDrag
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Click to upload.</span>
        </CSVReader>
        </div>
    )
}
