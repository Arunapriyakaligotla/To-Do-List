import React, { useState } from "react";
import "./List.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function List() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Read a book",
      priority: "Priority #2",
      dueDate: "Due:2024-05-20",
      completed: false,
    },
    {
      id: 2,
      name: "Go to gym",
      priority: "Priority #1",
      dueDate: "Due:2024-05-18",
      completed: false,
    },
    {
      id: 3,
      name: "Walk the dog",
      priority: "Priority #3",
      dueDate: "Due:2024-05-23",
      completed: false,
    },
    {
      id: 4,
      name: "Take appointment",
      priority: "Priority #4",
      dueDate: "Due:2024-05-27",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  function handleChangeInput(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(), 
          name: newTask,
          priority: "Priority #5",
          dueDate: "Due: 2024-05-30",
          completed: false,
        },
      ]);
      setNewTask("");
    }
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  const sortedTasks = [...tasks].sort(
    (a, b) =>
      new Date(a.dueDate.split(":")[1]) - new Date(b.dueDate.split(":")[1])
  );

  return (
    <div className="to-do-list">
      <div className="header">To-Do List</div>
      <div className="list">
        <input
          type="text"
          value={newTask}
          placeholder="Enter task name..."
          onChange={handleChangeInput}
          className="inputs"
        />
        <button className="ad-btn" onClick={addTask}>
          Add
        </button>
      </div>
      <div>
        <div className="w-100">
          {sortedTasks.map((taskItem, index) => (
            <div className="li" key={taskItem.id}>
              <span className="text">{taskItem.name}</span>
              <span className="duedate">{taskItem.dueDate}</span>
              <span className="priority">{taskItem.priority}</span>
              <button
                className={`cmplt-btn${taskItem.completed ? " clicked" : ""}`}
                onClick={() => toggleTaskCompletion(taskItem.id)}
              >
                {taskItem.completed ? "Completed" : "Complete"}
              </button>
              <button
                className="del-btn"
                onClick={() => deleteTask(taskItem.id)}
              >
                Delete
              </button>
              <div className="mve-btn">
                {index !== 0 && (
                  <ArrowUpwardIcon onClick={() => moveTaskUp(index)} />
                )}
              </div>
              <div className="mve-btn">
                {index !== tasks.length - 1 && (
                  <ArrowDownwardIcon onClick={() => moveTaskDown(index)} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
