import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addTask = () => {
    setTasks([...tasks, inputValue]);
    setInputValue("");
  };

  return (
    <div className="main">
      <h1 className="title">To-do List</h1>
      <div className="list-container"></div>
      <div className="form">
        <input
          type="text"
          placeholder="New task"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button type="submit" onClick={addTask}>
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
