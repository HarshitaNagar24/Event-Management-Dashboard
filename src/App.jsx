import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import { isLoggedIn } from "./utils/auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
