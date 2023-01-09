import React, { useReducer } from 'react';
import MainContext from './MainContext.js';
import {initialState, mainReducer} from './Reducer.js'

function MainContextProvider({ children }) {
  const [STATE, DISPATCH] = useReducer(mainReducer, initialState);

  return (
    <MainContext.Provider value={[STATE, DISPATCH]}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
