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

  const saveEditTask = () => {
    if (editValue.trim() === "") return;
    const tempTasks = [...tasks];
    tempTasks[editIndex] = editValue;
    setTasks(tempTasks);
    setEditIndex(-1);
    setEditValue("");
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
            {editIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className="save-btn" onClick={saveEditTask}>Save</button>
                <button className="cancel-btn" onClick={() => setEditIndex(-1)}>Cancel</button>
              </div>
            ) : (
              <div className="task-container">
                <span className="task">{task}</span>
                <div className="btns-container">
                  <button className="edit-btn" onClick={() => editTask(index)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
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
