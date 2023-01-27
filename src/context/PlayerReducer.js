export const initialState = {
  context: false,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTEXT": {
      return {
        ...state,
        context: action.context,
      };
    }
    default: {
      return state;
    }
  }
};
