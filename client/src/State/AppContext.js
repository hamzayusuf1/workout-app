import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const initialState = {
  category: [],
};

export const addPostReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  console.log(userData);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};
