export const initialState = {
  contextUri: false,
  contextUris: false,
  context: false,
  offset: "",
  currentObject: false,
  isLyric: false,
  currentPlaying: null,
  playState: false,
  playingTrack: null,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTEXT_URI": {
      return {
        ...state,
        contextUri: action.contextUri,
      };
    }
    case "SET_CONTEXT_URIS": {
      return {
        ...state,
        contextUris: action.contextUris,
      };
    }
    case "OFFSET": {
      return {
        ...state,
        offset: action.offset,
      };
    }
    case "SET_CONTEXT": {
      return {
        ...state,
        context: action.context,
      };
    }
    case "SET_IS_LYRIC": {
      return {
        ...state,
        isLyric: !state.isLyric,
      };
    }
    case "SET_PLAYING_TRACK": {
      return {
        ...state,
        playingTrack: action.playingTrack,
      };
    }
    case "SET_CURRENT_PLAYING": {
      return {
        ...state,
        currentTrack: action.currentTrack,
      };
    }
    case "SET_PLAY_STATE": {
      return {
        ...state,
        playState: action.playState,
      };
    }
    default: {
      return state;
    }
  }
};
