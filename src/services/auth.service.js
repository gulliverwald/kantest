import React, { createContext, useContext } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const register = (username, email, password) => axios.post(`${API_URL}signup`, {
    username,
    email,
    password,
  });

  const login = (username, password) => axios
    .post(`${API_URL}signin`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });

  const logout = () => {
    localStorage.removeItem('user');
  };

  const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

  return (
    <AuthContext.Provider
      value={{ user: getCurrentUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
