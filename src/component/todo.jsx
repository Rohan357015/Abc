import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export const Card = () => {
    const [inputValue, setInputValue] = useState(""); // Input value state
    const [tasks, setTasks] = useState([]); // Task list state
    const [timee, setTime] = useState("");

    // Update the date and time
    setInterval(() => {
        const now = new Date();
        const din = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        setTime(`${din} - ${time}`);
    }, 1000);

    // Handle form submission
    const handleForm = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return; // Prevent adding empty tasks

        // Add task as an object with a default `checked: false` state
        setTasks((prevTasks) => [...prevTasks, { value: inputValue, checked: false }]);
        setInputValue(""); // Clear input field
    };

    // Handle input value changes
    const handleInput = (value) => {
        setInputValue(value);
    };

    // Handle delete action using filter
    const handleDelete = (value) => {
        // Use filter to remove the task by value
        setTasks((prevTasks) => prevTasks.filter((task) => task.value !== value));
    };

    // Handle clearing all tasks
    const handleClear = () => {
        setTasks([]);
    };

    // Handle check/uncheck of a task
    const handleCheck = (value) => {
        const updatedTasks = tasks.map((curTask) => {
            if (curTask.value === value) {
                return { ...curTask, checked: !curTask.checked }; // Toggle checked state
            }
            return curTask;
        });
        setTasks(updatedTasks);
    };

    return (
        <>
            <h1>Todo App</h1>
            <div className="container">
                <span className="Date">{timee}</span>
                <form action="" onSubmit={handleForm}>
                    <div className="input-box">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => handleInput(e.target.value)}
                        />
                        <button type="submit">Add Task</button>
                    </div>
                </form>
                <div>
                    <ul>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <li key={index}>
                                    <div className="message">
                                        <span
                                            className={task.checked ? "data" : "check"}
                                        >
                                            {task.value}
                                        </span>
                                        <button onClick={() => handleDelete(task.value)}>
                                            <MdDelete />
                                        </button>
                                        <button onClick={() => handleCheck(task.value)}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No tasks added yet</p>
                        )}
                    </ul>
                    {tasks.length > 0 && (
                        <button className="clear-btn" onClick={handleClear}>
                            Clear all
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
