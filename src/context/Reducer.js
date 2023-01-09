export const initialState = {
  token: '',
  user: null,
  login: false,
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN': {
      return {
        ...state,
        token: action.token,
      };
    }

    case 'SET_USER': {
      return {
        ...state,
        user: action.user,
      };
    }

    default: {
      return state;
    }
  }
};
