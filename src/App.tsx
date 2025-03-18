import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addTask = () => {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, inputValue]);
    setInputValue("");
  };

  const editTask = (index: number) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const deleteTask = (index: number) => {
    const tempTasks = [...tasks];
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  };

  return (
    <div className="main">
      <h1 className="title">To-do List</h1>
      <div className="list-container">
        {tasks.map((task, index) => (
          <div className="list-item" key={index}>
            {task}
            <input
              type="text"
            />
            <div className="btns-container">
              <button className="edit-btn" onClick={() => editTask(index)}>
                T
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
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
