// src/utils/auth.js
export const USER = {
    username: 'Admin',
    password: 'Admin@123',
  };
  
  export const login = (username, password) => {
    return username === USER.username && password === USER.password;
  };
  
  export const setUserSession = () => {
    localStorage.setItem('isAuthenticated', 'true');
  };
  
  export const isLoggedIn = () => {
    return localStorage.getItem('isAuthenticated') == 'true';
  };
  
  export const logout = () => {
    localStorage.removeItem('isAuthenticated');
  };
  