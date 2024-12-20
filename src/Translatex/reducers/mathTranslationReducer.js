export const initialState = {
  responseText: '',
  latexContent: 'E=mc^2',
  errorMessage: '',
  selectedFile: null,
  isDragOver: false,
  token: '',
  history: [],
  timerId: null
};

export const ActionTypes = {
  SET_RESPONSE: 'SET_RESPONSE',
  SET_LATEX: 'SET_LATEX',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_FILE: 'SET_FILE',
  REMOVE_FILE: 'REMOVE_FILE',
  SET_DRAG_OVER: 'SET_DRAG_OVER',
  SET_TOKEN: 'SET_TOKEN',
  UPDATE_HISTORY: 'UPDATE_HISTORY',
  SET_TIMER: 'SET_TIMER',
  CLEAR_TIMER: 'CLEAR_TIMER'
};

export function mathTranslationReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_RESPONSE:
      return {
        ...state,
        responseText: action.payload,
        latexContent: action.payload.latex_styled
      };

    case ActionTypes.SET_LATEX:
      return {
        ...state,
        latexContent: action.payload
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: ''
      };

    case ActionTypes.SET_FILE:
      return {
        ...state,
        selectedFile: action.payload,
        isDragOver: true
      };

    case ActionTypes.REMOVE_FILE:
      return {
        ...state,
        selectedFile: null,
        isDragOver: false
      };

    case ActionTypes.SET_DRAG_OVER:
      return {
        ...state,
        isDragOver: action.payload
      };

    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case ActionTypes.UPDATE_HISTORY:
      return {
        ...state,
        history: action.payload
      };

    case ActionTypes.SET_TIMER:
      if (state.timerId) {
        clearTimeout(state.timerId);
      }
      return {
        ...state,
        timerId: action.payload
      };

    case ActionTypes.CLEAR_TIMER:
      if (state.timerId) {
        clearTimeout(state.timerId);
      }
      return {
        ...state,
        timerId: null
      };

    default:
      return state;
  }
} 