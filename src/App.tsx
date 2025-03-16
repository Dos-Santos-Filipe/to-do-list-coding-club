import './App.css'

function App() {



  return (
    <div className="main">
      <h1 className="title">To-do List</h1>
      <div className="list-container"></div>
      <div className="form">
        <input type="text" placeholder="Add a task" />
        <button type="submit">Add</button>
      </div>
    </div>
  )
}

export default App
