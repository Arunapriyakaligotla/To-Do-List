import React, { useState } from "react";
import "./List.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


function List() {
    const [task, setTask] = useState(["Read a book", "Go to Gym", "Walk the dog", "Take the appointment"]);
    const [newtask, setNewtask] = useState("");

    function handleChangeInput(e) {
        setNewtask(e.target.value);
    }

    function addTask() {
        if (newtask.trim() !== "") {
            setTask(prevTasks => [...prevTasks, newtask]);
            setNewtask("");
        }
    }

    function deleteTask(index) {
        const updatedTask = task.filter((_, i) => i !== index);
        setTask(updatedTask);
    }

    function moveTaskup(index) {
        if (index > 0) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    function moveTaskdown(index) {
        if (index < task.length - 1) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    return (
      
        <div className="to-do-list">
            <div className="header">To-Do List</div>
            <div >
                <input type="text" value={newtask} placeholder="Enter task name..." onChange={handleChangeInput} className='inputs'/>
                <button className="ad-btn" onClick={addTask}>Add</button>
            </div>
            <div>
                <ol>
                    {task.map((taskItem, index) => (
                        <li className="li" key={index}>
                            <span className="text">{taskItem}</span>
                            <button className="del-btn" onClick={() => deleteTask(index)}>Delete</button>
                         <div className="mve-btn">  {index !== 0 && <ArrowUpwardIcon onClick={() => moveTaskup(index)} />} </div> 
                          <div className="mve-btn">{index !== task.length - 1 && <ArrowDownwardIcon onClick={() => moveTaskdown(index)} />} 
                           </div> 
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        
    );
}

export default List;
