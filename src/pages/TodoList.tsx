import { apiGetTasks, apiSaveTask, apiDeleteTask } from "../services/api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const apiUrl = "http://localhost:3200/api";


type Task = {
  id: string;
  title: string;
  status: string;
};

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addTask = async () => {
    if (inputValue.trim() === "") return;

    const newTask: Task = {
      id: nanoid(),
      title: inputValue,
      status: "incomplete"
    };

    const savedTask = await apiSaveTask(newTask);
    setTasks([...tasks, savedTask]);
    setInputValue("");
  };

  const editTask = (id: string) => {
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
    setEditIndex("");
    setEditValue("");
  };

  const deleteTask = async (id: string) => {
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
                <button className="cancel-btn" onClick={() => setEditIndex("")}>Cancel</button>
              </div>
            ) : (
              <div className="task-container">
                <span className="task">{task.title}</span>
                <div className="btns-container">
                  <button className="edit-btn" onClick={() => task.id && editTask(task.id)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => task.id && deleteTask(task.id)}
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
