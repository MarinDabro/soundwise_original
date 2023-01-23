export const initialState = {
    catId: '',
    catName: '',
    tracks: null,
    trackId: '',
    trackName: '',
    playLists: null,
    activePlaylist: null
    
}

export const displayReducer = (state, action) => {
    switch(action.type){
        case 'SET_TRACK_ID':{
            return{
                ...state,
                trackId : action.trackId
            }
        }
        case 'SET_TRACK_NAME':{
            return{
                ...state,
                trackName: action.trackName
            }
        }
        case "SET_PLAYLISTS": {
            return {
              ...state,
              playLists: action.playLists,
            };
          }
          case 'SET_CAT_ID':{
            return{
                ...state,
                catId: action.catId
            }
          }
          case 'SET_CAT_NAME':{
            return{
                ...state,
                catName: action.catName
            }
          }
          case 'SET_TRACKS':{
            return{
                ...state,
                tracks: action.tracks
            }
          }
          case 'SET_ACTIVE_PLAYLIST':{
            return{
                ...state,
                activePlaylist: action.activePlaylist
            }
          }
       default:{
        return state
       }
    }
}