import React, { createContext, useContext, useState, useReducer } from "react";

import { actionsTypes } from "./Actions/Actions";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const initialState = {
  category: [],
  addPostImage: "",
  editProfileImage: "",
};

export const addPostReducer = (state, action) => {
  switch (action.type) {
    case actionsTypes.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case actionsTypes.UPLOAD_POST_IMAGE:
      return {
        ...state,
        addPostImage: action.payload,
      };

    case actionsTypes.UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        editProfileImage: action.payload,
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
