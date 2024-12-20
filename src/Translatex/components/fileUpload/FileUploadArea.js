import React, { useRef } from 'react';
import { FiUpload, FiPlus } from 'react-icons/fi';
import './FileUploadArea.css';

function FileUploadArea(props) {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      props.setSelectedFile(file);
      props.setIsDragOver(true);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent the label's default behavior
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="upload-container">
      {props.selectedFile ? (
        <div className="preview-container">
          <button className="remove-button" onClick={props.handleFileRemove}>×</button>
          <div>
            <p className="upload-text">Selected Image:</p>
            <img className="preview-image" src={URL.createObjectURL(props.selectedFile)} alt="Selected" />
          </div>
          <button className="submit-button" onClick={props.handlePostRequest}>
            Submit
          </button>
        </div>
      ) : (
        <label htmlFor="fileInput" className="upload-area">
          <input
            ref={fileInputRef}
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <FiUpload className="upload-icon" />
          <p className="upload-text">Drag and drop your image here or click to browse</p>
          <button 
            className="upload-button"
            onClick={handleButtonClick}
          >
            <FiPlus />
            Upload File
          </button>
        </label>
      )}
    </div>
  );
}

export default FileUploadArea;
