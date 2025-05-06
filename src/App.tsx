import React, { useEffect, useState } from "react";
import "./App.css";


// API begins ...
const apiUrl = "http://localhost:3200/api";

type Task = {
  id?: number;
  title: string;
  status: string;
};

const apiGetTasks = async () => {
  const response = await fetch(`${apiUrl}/tasks`, { method: "GET" });
  const res = await response.json();
  return res.data;
};

const apiSaveTask = async (task: Task) => {
  const response = await fetch(`${apiUrl}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  const data: Task = await response.json();
  return data;
};

const apiDeleteTask = async (taskId: { id: number }) => {
  await fetch(`${apiUrl}/task/${taskId.id}`, { method: "DELETE" });
};

// API ends

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addTask = async () => {
    if (inputValue.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: inputValue,
      status: "incomplete"
    };

    const savedTask = await apiSaveTask(newTask);
    setTasks([...tasks, savedTask]);
    setInputValue("");
  };

  const editTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    setEditIndex(id);
    setEditValue(task.title);
  };

  const saveEditTask = async () => {
    if (editValue.trim() === "") return;

    const editedTask = tasks.find((task) => task.id === editIndex);
    if (!editedTask) return;

    const update = { ...editedTask, title: editValue };

    const res = await fetch(`${apiUrl}/task/${update.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });

    const updatedTasks = await res.json();
    setTasks(tasks.map(task => task.id === updatedTasks.id ? updatedTasks : task));
    setEditIndex(-1);
    setEditValue("");
  };

  const deleteTask = async (id: number) => {
    try{
      await apiDeleteTask({ id });
      
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error); 
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await apiGetTasks();
      setTasks(res);
    };
    fetchTasks();
  }, []);

  return (
    <div className="main">
      <h1 className="title">To-do List</h1>
      <div className="list-container">
        {tasks.length === 0 ? <p>No Tasks yet</p> : tasks.map((task) => (
          <div className="list-item" key={task.id}>
            {editIndex === task.id ? (
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
                <span className="task">{task.title}</span>
                <div className="btns-container">
                  <button className="edit-btn" onClick={() => editTask(task.id!)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id!)}
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
