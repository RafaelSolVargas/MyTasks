import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const tasksContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    /* Hook to load tasks from API in loading page */
    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get(
                "https://jsonplaceholder.cypress.io/todos?_limit=10"
            )
            setTasks(data)
        }
        fetchTasks()
    }, [])

    function getTask(taskId) {
        const task = tasks.filter((eachTask) => String(eachTask.id) === taskId)

        return task
    }

    return (
        <tasksContext.Provider
            value={{
                getTask,
                tasks,
                setTasks
            }}>
            {children}
        </tasksContext.Provider>
    )
}

function useTasks() {
    const context = useContext(tasksContext);

    if (!context) throw new Error('useTasks must be used within an Tasks Provider')

    return context
}

export { TaskProvider, useTasks }