import { useState } from "react";
import Task from "./Task";
import "./index.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    if (newDueDate === "") {
      alert("Please select a due date.");
      return;
    }

    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, dueDate: newDueDate },
    ]);
    setNewTask("");
    setNewDueDate("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Management</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={(id, text) =>
              setTasks(tasks.map((t) => (t.id === id ? { ...t, text } : t)))
            }
            onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
            onToggleComplete={(id) =>
              setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
            }
            onChangeDueDate={(id, date) =>
              setTasks(tasks.map((t) => (t.id === id ? { ...t, dueDate: date } : t)))
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
