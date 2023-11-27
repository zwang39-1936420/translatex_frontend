import React, {useState, useEffect} from 'react';
import delete_X from '../assets/Delete X.png';
import CopyToClipboardButton from './CopyToClipboardButton';
import './style.css';

function MathEquationTranslation() {

  var Latex = require('react-latex');

  const [responseText, setResponseText] = useState('');
  const [latexContent, setLatexContent] = useState('E=mc^2');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Update state with the selected file
      setSelectedFile(file);
    }
  };

  const handleFileRemove = () => {
    // Remove the selected file by updating state to null
    setSelectedFile(null);
  };

  useEffect(() => {
    // Set the Latex Output
    if (responseText != ''){
      setLatexContent(responseText.latex_styled);
    } 
  }, [responseText]);

  const getAToken = async () => {
    url = "https://api.mathpix.com/v3/app-tokens"

    const response = await fetch('https://api.mathpix.com/v3/app-tokens', {
        method: 'POST',
        headers: {
          'app_key': '73a1fa037d5c782c76d7a64d78a8421516fdd44fbfa8cbac02fc2a9dc6a682d0',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      return responseData;
  }

  const handlePostRequest = async () => {
    try {
      const formData = new FormData();
      formData.append('file', document.getElementById('fileInput').files[0]);

      const options = {
        math_inline_delimiters: ['$', '$'],
        rm_spaces: true,
      };

      formData.append('options_json', JSON.stringify(options));
      
      const response = await fetch('https://api.mathpix.com/v3/text', {
        method: 'POST',
        body: formData,
        headers: {
          'app_id': 'eddie_edd673_50f656',
          'app_key': '73a1fa037d5c782c76d7a64d78a8421516fdd44fbfa8cbac02fc2a9dc6a682d0',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setResponseText(responseData);
      console.log(responseData);
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };


  
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">Translatex</div>
        <div className="nav-links">
          <a href="#" className="history-link">History</a>
          <button className="documentation-btn">Documentation</button>
        </div>
      </nav>

      <h1>TransLatex, Your Math Career saver</h1>

      <div className="main-content">
        <div className="input">
          { selectedFile ? (          
            <label className="upload-lab">
              Change file
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>) : (
            <label className="upload-lab">
              Upload file
              <input
                type="file"ß
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>)}
          {selectedFile && <button className="upload-btn" onClick={handlePostRequest}>Submit</button>}
        </div>

        {selectedFile && (
          <div className='preview'>
            <div>
              <p>Selected Image:</p>
              <img className='delete' src = {delete_X} onClick={handleFileRemove}/>
            </div>
            <img className='preview_img' src={URL.createObjectURL(selectedFile)} alt="Selected" />
          </div>
        )}

        <div className="output">
          <div className="text-box-container">
            <p className='output-text'>{responseText.latex_styled}</p>
            <CopyToClipboardButton textToCopy = {responseText.latex_styled}></CopyToClipboardButton>
          </div>

          <div className="text-box-container">
            <div className='latexOutput'>
                <p>LaTeX formula preview: </p>
                <Latex>{`$${latexContent}$`}</Latex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MathEquationTranslation;
