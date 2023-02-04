export const initialState = {
  contextUri: false,
  contextUris: false,
  context:false,
  offset: '',
  currentObject: false,  
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTEXT_URI": {
      return {
        ...state,
        contextUri: action.contextUri,
      };
    } case "SET_CONTEXT_URIS": {
      return {
        ...state,
        contextUris: action.contextUris,
      };
    }
    case 'OFFSET':{
      return{
        ...state,
        offset: action.offset
      }
    }
    case "SET_CONTEXT":{
      return{
        ...state,
        context: action.context
      }
    }
    default: {
      return state;
    }
  }
};
