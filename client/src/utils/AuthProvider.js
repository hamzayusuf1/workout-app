import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [user, setUser] = useState({});

  let token = window.localStorage.getItem("id_token");

  const url = `http://localhost:5008/user/findUser/${token}`;

  //   const { data: findUser = [token] } = useQuery({
  //     queryKey: [token],
  //     queryFn: async () => {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       setUser(data.user);
  //       console.log(data);
  //       return data;
  //     },
  //   });

  //   useEffect(() => {
  //     if (token) {
  //       setUserAuth({
  //         token,
  //         isAuth: true,
  //       });
  //     }
  //   }, []);

  const logout = () => {
    setUserAuth(false);
    window.localStorage.removeItem("id_token");
    window.location.assign("/");
  };
  const authInfo = {
    userAuth,
    setUserAuth,
    logout,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
