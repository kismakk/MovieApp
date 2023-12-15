import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const backendurl = process.env.REACT_APP_BACKENDURL;

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const logout = () => {
    axios.post(`${backendurl}/users/signout`, {}, { withCredentials: true })
      .then(() => {
      })
      .catch((err) => {
        console.error('Axios error: ', err);
      })
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
