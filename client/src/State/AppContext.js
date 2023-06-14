import React, { createContext, useContext, useState, useReducer } from "react";

import { actionsTypes } from "./Actions/Actions";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const initialState = {
  category: [],
  image: "",
};

export const addPostReducer = (state, action) => {
  switch (action.type) {
    case actionsTypes.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case actionsTypes.UPLOAD_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [state, dispatch] = useReducer(addPostReducer, initialState);

  return (
    <AppContext.Provider value={{ userData, setUserData, state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
