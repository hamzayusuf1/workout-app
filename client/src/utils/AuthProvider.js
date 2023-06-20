import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  let token = window.localStorage.getItem("id_token");

  console.log(user);

  const url = `http://localhost:5008/user/findUser/${token}`;

  // const { data: findUser = [token] } = useQuery({
  //   queryKey: [token],
  //   queryFn: async () => {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setUser(data.user);
  //     console.log(res);
  //     return data;
  //   },
  // });

  console.log(user);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          return;
        }
        setUser({
          user: data.user,
          isAuth: true,
        });
      });
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     setUserAuth({
  //       token,
  //       isAuth: true,
  //     });
  //   }
  // }, []);

  const logout = () => {
    window.localStorage.removeItem("id_token");
    window.location.assign("/");
  };
  const authInfo = {
    logout,
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
