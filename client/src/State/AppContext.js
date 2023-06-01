import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: "Hamza",
    lastName: "Yusuf",
    email: "hamzayusuf26@outlook.com",
    height: "6'2",
    weight: "75kg",
  });

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
