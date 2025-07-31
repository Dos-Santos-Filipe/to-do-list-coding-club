import "./App.css";
import {  Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { TodoList } from "./pages/TodoList";

function App() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  return (
      <Routes>
        <Route
          path="/"
          element={!userId ? <Login onLogin={setUserId} /> : <Navigate to="/todo" />}
        />
        <Route
          path="/todo"
          element={userId ? <TodoList /> : <Navigate to="/" />}
        />
      </Routes>
  );
};

export default App;

