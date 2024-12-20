import React, { useReducer, useEffect, useCallback } from 'react';
import CopyToClipboard from '../components/buttons/CopyToClipboard';
import CopyImageToClipboard from '../components/buttons/CopyImageToClipboard';
import TranslationHistory from '../components/history/TranslationHistory';
import FileUploadArea from '../components/fileUpload/FileUploadArea';
import { mathTranslationReducer, initialState, ActionTypes } from '../reducers/mathTranslationReducer';
import '../styles/index.css';

function MathEquationTranslation() {
  const Latex = require('react-latex');
  const [state, dispatch] = useReducer(mathTranslationReducer, initialState);

  const handleHistoryChange = useCallback((newHistory) => {
    dispatch({ type: ActionTypes.UPDATE_HISTORY, payload: newHistory });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://translatex-backend-app-3dae282219b5.herokuapp.com/api/data');
      const result = await response.json();
      dispatch({ type: ActionTypes.SET_TOKEN, payload: result.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const newTimerId = setTimeout(() => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    }, 3000);

    dispatch({ type: ActionTypes.SET_TIMER, payload: newTimerId });
  }, [state.errorMessage]);

  const handleFileRemove = () => {
    dispatch({ type: ActionTypes.REMOVE_FILE });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePostRequest = async () => {
    try {
      await fetchData();
      const formData = new FormData();
      formData.append('file', state.selectedFile);

      const options = {
        math_inline_delimiters: ['$', '$'],
        rm_spaces: true,
      };

      formData.append('options_json', JSON.stringify(options));
      
      const response = await fetch('https://api.mathpix.com/v3/text', {
        method: 'POST',
        body: formData,
        headers: {
          'app_token': state.token,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (!responseData.error_info) {
        dispatch({ type: ActionTypes.SET_RESPONSE, payload: responseData });
        handleHistoryChange([responseData.latex_styled, ...state.history]);
      } else {
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Error: ' + responseData.error_info.message + "please try again!"
        });
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">Translatex</div>
            <div className="flex items-center gap-x-5 md:gap-x-8" style={{ position: 'relative', zIndex: 50 }}>
              <TranslationHistory 
                history={state.history}
                onHistoryChange={handleHistoryChange}
              />
            </div>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-5 text-center lg:pt-10">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">TransLatex, Your Math Career saver</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">Upload equations you want to translate into Latex format!</p>
      </div>

      <div className="mx-auto flex h-1/2screen w-full items-center justify-center max-w-5xl px-4 sm:px-6 lg:px-8 rounded-lg bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5" >
        <div className="grid h-full w-full grid-cols-8 grid-rows-4 z-50 gap-4">
            <div className="col-span-4 row-span-4">
              <FileUploadArea 
                selectedFile={state.selectedFile}
                setSelectedFile={(file) => dispatch({ type: ActionTypes.SET_FILE, payload: file })}
                handlePostRequest={handlePostRequest}
                isDragOver={state.isDragOver}
                setIsDragOver={(value) => dispatch({ type: ActionTypes.SET_DRAG_OVER, payload: value })}
                handleFileRemove={handleFileRemove}
              />
            </div>
              <div className="col-span-4 row-span-2 relative flex-auto border border-indigo-600 rounded-lg flex flex-col items-center justify-center">
                <p className="mx-auto max-w-2xl text-lg tracking-tight text-slate-700 text-center p-4 mb-4">{state.responseText.latex_styled}</p>
                <CopyToClipboard 
                  textToCopy={state.responseText.latex_styled} 
                  textOnButton="Copy"
                />
              </div>


              <div className=" col-span-4 row-span-2 flex flex-col flex-auto items-center justify-center relative  border border-indigo-600 rounded-lg">
                  <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">LaTeX formula preview: </p>
                  <Latex className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{`$${state.latexContent}$`}</Latex>
                  <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{state.errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MathEquationTranslation;
