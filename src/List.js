import React, { useState } from "react";
import "./List.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function List() {
    const [task, setTask] = useState([
        { id: 1, name: "Read a book", priority: "Priority #2", dueDate: "Due:2024-05-20", completed: false },
        { id: 2, name: "Go to gym", priority: "Priority #1", dueDate: "Due:2024-05-18", completed: false },
        { id: 3, name: "Walk the dog", priority: "Priority #3", dueDate: "Due:2024-05-23", completed: false },
        { id: 4, name: "Take appointment", priority: "Priority #4", dueDate: "Due:2024-05-27", completed: false }
    ]);

    const [newtask, setNewtask] = useState("");

    function handleChangeInput(e) {
        setNewtask(e.target.value);
    }

    function addTask() {
        if (newtask.trim() !== "") {
            setTask((prevTasks) => [...prevTasks, { id: prevTasks.length + 1, name: newtask, priority: "Priority #5", dueDate: "Due: 2024-05-30", completed: false }]);
            setNewtask("");
        }
    }

    function deleteTask(index) {
        const updatedTask = task.filter((_, i) => i !== index);
        setTask(updatedTask);
    }
    function toggleTaskCompletion(index) {
        const updatedTask = [...task];
        updatedTask[index] = { ...updatedTask[index], completed: !updatedTask[index].completed };
        setTask(updatedTask);
    }

    function moveTaskup(index) {
        if (index > 0) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index - 1]] = [
                updatedTask[index - 1],
                updatedTask[index],
            ];
            setTask(updatedTask);
        }
    }

    function moveTaskdown(index) {
        if (index < task.length - 1) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index + 1]] = [
                updatedTask[index + 1],
                updatedTask[index],
            ];
            setTask(updatedTask);
        }
    }

    const sortedTasks = [...task].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));


    return (
        <div className="to-do-list">
            <div className="header">To-Do List</div>
            <div className="list" >
                <input
                    type="text"
                    value={newtask}
                    placeholder="Enter task name..."
                    onChange={handleChangeInput}
                    className="inputs"
                />
                <button className="ad-btn" onClick={addTask}>
                    Add
                </button>
            </div>
            <div>
                <div className="w=100">
                    
                    {sortedTasks.map((taskItem, index) => (
                        <div className="li" key={index}>
                           <span className="text">{taskItem.name} </span>
                           <span className="duedate"> {taskItem.dueDate} </span>                          
                         <span className="priority"> {taskItem.priority}</span>
                           <button
  className={`cmplt-btn${taskItem.completed ? " clicked" : ""}`}
  onClick={() => toggleTaskCompletion(index)}
>
  {taskItem.completed ? "Completed" : "Complete"}
</button>

                           
                           
                           
                            <button className="del-btn" onClick={() => deleteTask(index)}>
                                Delete
                            </button>
                            <div className="mve-btn">
                                {" "}
                                {index !== 0 && (
                                    <ArrowUpwardIcon onClick={() => moveTaskup(index)} />
                                )}{" "}
                            </div>
                            <div className="mve-btn">
                                {index !== task.length - 1 && (
                                    <ArrowDownwardIcon onClick={() => moveTaskdown(index)} />
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



