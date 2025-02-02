interface TaskProps {
    task: { id: number; text: string; completed: boolean; dueDate: string };
    onEdit: (id: number, newText: string) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onChangeDueDate: (id: number, newDate: string) => void;
  }
  
  const Task = ({ task, onEdit, onDelete, onToggleComplete, onChangeDueDate }: TaskProps) => {
    return (
      <li className={task.completed ? "completed" : ""}>
        <input
          type="text"
          value={task.text}
          onChange={(e) => onEdit(task.id, e.target.value)}
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => onChangeDueDate(task.id, e.target.value)}
        />
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </li>
    );
  };
  
  export default Task;
  