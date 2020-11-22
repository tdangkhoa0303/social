import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "../helpers/cookieHelper";
import { requestTokenRefresh, requestLogin, setToken } from "../helpers/api";
import { v4 } from "uuid";

const AuthContext = React.createContext();

export function Provider(props) {
  const [auth, setAuth] = useState({ isAuth: null, user: null });

  useEffect(() => {
    const isLogin = getCookie("auth");
    if (isLogin) {
      refreshToken();
    } else setAuth({ isAuth: false, user: null });
  }, []);

  const __setUser = (data) => {
    const { user, refreshTTL } = data;
    setToken(user.token);
    setCookie("auth", v4(), refreshTTL);
    setAuth({
      isAuth: true,
      user,
    });
  };

  const signIn = async (email, password) => {
    try {
      const {
        data: { data },
      } = await requestLogin(email, password);
      if (data) __setUser(data);
    } catch (err) {
      console.log(err);
      setAuth({ isAuth: false, user: null });
    }
  };

  const refreshToken = async () => {
    try {
      const {
        data: { data },
      } = await requestTokenRefresh();
      if (data) __setUser(data);
    } catch (err) {
      setAuth({ isAuth: false, user: null });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, refreshToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
