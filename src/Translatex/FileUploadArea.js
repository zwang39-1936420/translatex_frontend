import React, {useState}from 'react';
// import './ImageUploadPopup.css';
import '../index.js';
import { FiUpload, FiPlus } from 'react-icons/fi';
import './ImageUploadAndCropPopup.js'
import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';


function FileUploadArea(props) {

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Update state with the selected file
      props.setSelectedFile(file);
      props.setIsDragOver(true);
      setPopupOpen(true);
      setSrc(URL.createObjectURL(file));
    }
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div >

        { props.selectedFile ? (          
          <div className={`upload-lab ${props.isDragOver ? 'drag-over' : ''}`}>
              {/* <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                onDragEnter={handleDragEnter}
                onDragOver={preventDefault}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                accept="image/*"
              /> */}
            
            <div className='preview' >
              <button className="gen-button" onClick={props.handleFileRemove}>X</button>
              <div onClick={openPopup}>
                <p>Selected Image:</p>
                <img className='preview_img' src={URL.createObjectURL(props.selectedFile)} alt="Selected" />
              </div>
            </div>
          </div>) : (
          <label
            htmlFor="fileInput"
            class="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-6 rounded-lg border border-dashed border-gray-300 hover:cursor-pointer relative"
          >
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FiUpload className="text-gray-400 text-4xl mb-4" />
            <p className="text-gray-600 mb-4">No files uploaded yet</p>
            <label
              htmlFor="fileInput"
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded hover:cursor-pointer"
            >
              <FiPlus className="mr-2" />
              Upload File
            </label>
        </label>)}
        {isPopupOpen && (
          <div className="image-popup">
            <div className="popup-content">
              <ReactCrop 
                crop={crop} 
                onChange={c => setCrop(c)}>
                <img src={URL.createObjectURL(props.selectedFile)} alt="Uploaded" />
              </ReactCrop>
              <button className="gen-button" onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
        {/* {isPopupOpen && (
            <ImageUploadAndCropPopup
              selectedFile={props.selectedFile}
              setSelectedFile={props.setSelectedFile}
              isPopupOpen={isPopupOpen}
              closePopup={closePopup}
              src={src}
              setSrc={setSrc}
              setPopupOpen={setPopupOpen}
            />
            )}   */}
        {props.selectedFile && <button className="upload-btn" onClick={props.handlePostRequest}>Submit</button>}

    </div>

  );
};

export default FileUploadArea;
