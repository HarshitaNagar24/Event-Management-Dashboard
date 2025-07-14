// src/App.jsx
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import "./App.css";
import { isLoggedIn, logout } from "./utils/auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  // 1. Manage auth state here. Initialize it from localStorage.
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  // 2. Create a logout handler that updates the state.
  const handleLogout = () => {
    logout(); // Clears localStorage
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // 3. Use the state variable for the check, not the function.
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;