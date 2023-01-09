export const initialState = {
  token: '',
  playLists: [],
  playListTracks: [],
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
    case 'SET_PLAYLISTS':{
      return{
        ...state,
        playLists: action.playLists
      }
    }
    case 'SET_PLAYLIST_TRACKS': {
      return{
        ...state,
        playListTracks: action.playListTracks
      }
    }

    default: {
      return state;
    }
  }
};
