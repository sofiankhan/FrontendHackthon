import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Simulated user storage (in a real app, this would be in a backend)
let registeredUsers = [];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const register = (userData) => {
    const existingUser = registeredUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setError('Email already registered');
      return false;
    }
    registeredUsers.push(userData);
    setError('');
    return true;
  };

  const login = (credentials) => {
    const user = registeredUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      setUser(user);
      setError('');
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setError('');
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);