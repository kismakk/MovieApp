import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
    axios.post('http://localhost:3001/users/signin', { uname: 'profiletest', pw: 'test' }, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error('Axios error: ', err);
      })
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const logout = () => {
    axios.post('http://localhost:3001/users/signout', {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
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
