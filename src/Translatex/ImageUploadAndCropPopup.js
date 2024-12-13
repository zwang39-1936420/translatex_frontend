import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageUploadAndCropPopup.css'; // Import the corresponding CSS file

function ImageUploadAndCropPopup(props) {
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const imageRef = useRef(null);

  const selectImage = (file) => {
    props.setSrc(URL.createObjectURL(file));
};
  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  const onCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const closePopup = () => {
    setCrop({ unit: '%', width: 30, aspect: 4 / 3 });
    setCompletedCrop(null);
    props.setPopupopen(false);
  };

  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
};
  return (

    <div className="crop-popup">
        <div className="popup-content">
        <ReactCrop
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}>
            <img src={URL.createObjectURL(props.selectedFile)} alt="Uploaded"/>
        </ReactCrop>
        <div>
            <button className="gen-button" onClick={closePopup}>Close</button>
        </div>  
        </div>
    </div>
  );
};

export default ImageUploadAndCropPopup;
