import React, { useReducer } from 'react';
import MainContext from './MainContext.js';
import { initialState, mainReducer } from './Reducer.js';

function MainContextProvider({ children }) {
  const [STATE, DISPATCH] = useReducer(initialState, mainReducer);

  return (
    <MainContext.Provider value={[STATE, DISPATCH]}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
