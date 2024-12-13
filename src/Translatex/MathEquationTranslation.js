import React, {useState, useEffect} from 'react';
import CopyToClipboardButton from './CopyToClipboardButton';
import LatexCopyButton from './CopyImageToClipboardButton.js';
import TranslationHistory from './TranslationHistory.js';
import FileUploadArea from './FileUploadArea';
import './style.css';
import '../index.css';

function MathEquationTranslation() {

  var Latex = require('react-latex');
  const ifHasLocalStorage = () => {
    if(localStorage.getItem("history")){
        return JSON.parse(localStorage.getItem("history"));
    } 
    return [];
    }

  const [responseText, setResponseText] = useState('');
  const [latexContent, setLatexContent] = useState('E=mc^2');
  const [timerId, setTimerId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [token, setToken] = useState('');
  const [history, setHistory] = useState(ifHasLocalStorage());



  const fetchData = async () => {
    try {
      const response = await fetch('https://translatex-backend-app-3dae282219b5.herokuapp.com/api/data');
      const result = await response.json();
      setToken(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Clear any existing timeout (if it exists)
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000); // 3 seconds

    // Store the new timeout ID in state
    setTimerId(newTimerId);
  }, [errorMessage]);


  const handleFileRemove = () => {
    // Remove the selected file by updating state to null
    setSelectedFile(null);
  };

  useEffect(() => {
    // Set the Latex Output
    if (responseText !== ''){
      setLatexContent(responseText.latex_styled);
    } 
  }, [responseText]);

  //Fetch a token in initial rendering.
  useEffect(() => {
    fetchData();
  }, []);


  const handlePostRequest = async () => {
    try {

      fetchData();
      console.log(token);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const options = {
        math_inline_delimiters: ['$', '$'],
        rm_spaces: true,
      };

      formData.append('options_json', JSON.stringify(options));
      
      const response = await fetch('https://api.mathpix.com/v3/text', {
        method: 'POST',
        body: formData,
        headers: {
          'app_token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (!responseData.error_info) {
        setResponseText(responseData);
        setHistory([responseData.latex_styled, ...history]);
        console.log(responseData);
      } else {
        setErrorMessage('Error: ' + responseData.error_info["message"] + "please  try  again!");
      }

    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };


  
  return (
    <div class="flex h-full flex-col">
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav class="relative z-50 flex justify-between">
            <div class="flex items-center md:gap-x-12">Translatex</div>
            <div class="flex items-center gap-x-5 md:gap-x-8">
              <TranslationHistory 
                history = {history}
                setHistory = {setHistory}
              ></TranslationHistory>
            </div>
          </nav>
        </div>
      </header>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
        <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">TransLatex, Your Math Career saver</h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">Upload equations you want to translate into Latex format!</p>
      </div>

      <div class="mx-auto flex h-1/2screen w-full items-center justify-center max-w-5xl px-4 sm:px-6 lg:px-8 rounded-lg bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5" >
        {/* <div class="flex flex-row gap-x-2 justify-center relative min-h-1/2screen w-full bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"> */}
        <div class="grid h-full w-full grid-cols-8 grid-rows-4 z-50 gap-4">
            <div class="col-span-4 row-span-4">
              <FileUploadArea 
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                handlePostRequest={handlePostRequest}
                isDragOver={isDragOver}
                setIsDragOver={setIsDragOver}
                handleFileRemove={handleFileRemove}
              />
            </div>
              <div class="col-span-4 row-span-2 relative flex-auto border border-indigo-600 rounded-lg">
                <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{responseText.latex_styled}</p>
                <CopyToClipboardButton textToCopy = {responseText.latex_styled} textOnButton={"Copy"}></CopyToClipboardButton>
              </div>


              <div class=" col-span-4 row-span-2 flex flex-col flex-auto items-center justify-center relative  border border-indigo-600 rounded-lg">
                  <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">LaTeX formula preview: </p>
                  <Latex class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{`$${latexContent}$`}</Latex>
                  <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MathEquationTranslation;
