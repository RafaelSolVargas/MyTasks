import React, { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
/* API */
import { CreateTask, UpdateTask, DeleteTask } from "../services/tasks";
/* Context */
import { useAuth } from "./authContext";
import { useLoading } from "./loadingContext";

const tasksContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [taskError, setTaskError] = useState('')
    const [tasksLoaded, setTasksLoaded] = useState(false)
    const { showLoading, hideLoading } = useLoading()
    const { Logout, user } = useAuth()
    const history = useHistory()

    /* Hook to load tasks from API in loading page */
    useEffect(() => {
        if (user.userTasks) {
            showLoading('Loading Tasks')

            for (let i = 0; i < user.userTasks.length; i++) {
                user.userTasks[i].dateRegistration = new Date(user.userTasks[i].dateRegistration).toLocaleString()
            }
            setTasks(user.userTasks)
            setTasksLoaded(true)
            hideLoading('Loading Tasks')
        }
        else {
            setTasksLoaded(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getTask(taskId) {
        const task = tasks.filter((eachTask) => String(eachTask.id) === taskId)

        return task
    }

    async function createTask(values) {
        showLoading('Creating Task')
        /* Send the values to create a new Task in DB */
        const [hasErrors, response] = await CreateTask(values)
        /* If there is some error we set him to Component show to User */
        hideLoading('Creating Task')
        if (hasErrors) {
            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('Your session expired, log in again')
                setTimeout(() => {
                    hideLoading('Your session expired, log in again')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        /* If not we add the new task returned by de DB to tasks list */
        else {
            const newTasks = [
                ...tasks,
                {
                    id: response.task.id,
                    title: response.task.title,
                    completed: response.task.completed,
                    description: response.task.description,
                    dateRegistration: new Date(response.task.dateRegistration).toLocaleString(),
                }
            ]

            setTasks(newTasks)
        }
    }

    async function updateTask(values, taskId) {
        showLoading('Updating your task')
        const [hasErrors, response] = await UpdateTask(values, taskId)
        if (hasErrors) {
            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('Your session expired, log in again')
                setTimeout(() => {
                    hideLoading('Your session expired, log in again')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            hideLoading('Updating your task')
            /* If the update tasks request was successful we change the App tasks state */
            const newTasks = tasks.map(task => {
                if (task.id === taskId) {
                    task = values
                    return task
                }
                return task
            })
            setTasks(newTasks)
        }
    }

    async function updateTaskStatus(task) {
        task.completed = !task.completed
        showLoading('Updating Task')
        const [hasErrors, response] = await UpdateTask(task, task.id)
        hideLoading('Updating Task')

        if (hasErrors) {
            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('Your session expired, log in again')
                setTimeout(() => {
                    hideLoading('Your session expired, log in again')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            /* If the update tasks request was successful we change the App tasks state */
            const newTasks = tasks.map(oldTask => {
                if (oldTask.id === task.id) {
                    oldTask = task
                    return task
                }
                return oldTask
            })
            setTasks(newTasks)
        }
    }

    async function deleteTask(taskId) {
        showLoading('Deleting Task')

        const [hasErrors, response] = await DeleteTask(taskId)
        hideLoading('Deleting Task')
        if (hasErrors) {
            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('Your session expired, log in again')
                setTimeout(() => {
                    hideLoading('Your session expired, log in again')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            /* If the deleted request was successfully, we change the App tasks state */
            const newTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(newTasks)
        }
    }

    return (
        <tasksContext.Provider
            value={{
                getTask,
                tasks,
                setTasks,
                createTask,
                taskError,
                setTaskError,
                tasksLoaded,
                updateTask,
                deleteTask,
                updateTaskStatus
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